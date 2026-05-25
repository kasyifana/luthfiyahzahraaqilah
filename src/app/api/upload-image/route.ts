import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const isProfile = formData.get('isProfile') === 'true';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file was uploaded.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const originalName = file.name;
    const fileExtension = path.extname(originalName) || '.png';
    const cleanFileName = `uploaded_${Date.now()}${fileExtension}`;

    const isVercel = (process.env.VERCEL === '1' || process.env.NOW_BUILD === '1') && process.env.NODE_ENV === 'production';

    // Helper function to handle local profile image write
    const writeProfileLocal = (): NextResponse => {
      if (isVercel) {
        return NextResponse.json(
          { success: false, error: 'Vercel Blob token is missing or misconfigured in production. Local uploads are not supported on Vercel read-only filesystem.' },
          { status: 500 }
        );
      }
      console.log("[UPLOAD-FALLBACK] Saving profile image to local disk.");
      const targetPath = path.join(process.cwd(), 'public', 'images', 'profile', 'image.png');
      const targetDir = path.dirname(targetPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      fs.writeFileSync(targetPath, buffer);
      return NextResponse.json({ 
        success: true, 
        url: `/images/profile/image.png?t=${Date.now()}` 
      });
    };
 
    // Helper function to handle local generic uploader write
    const writeGenericLocal = (): NextResponse => {
      if (isVercel) {
        return NextResponse.json(
          { success: false, error: 'Vercel Blob token is missing or misconfigured in production. Local uploads are not supported on Vercel read-only filesystem.' },
          { status: 500 }
        );
      }
      console.log("[UPLOAD-FALLBACK] Saving generic image to local uploads disk.");
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const targetPath = path.join(uploadDir, cleanFileName);
      fs.writeFileSync(targetPath, buffer);
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${cleanFileName}` 
      });
    };

    // 1. Profile photo upload branch
    if (isProfile) {
      // Check if we even have a token pattern
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      const hasValidTokenPattern = token && token.startsWith('vercel_blob_rw_');

      if (!hasValidTokenPattern) {
        console.warn("[UPLOAD] Vercel Blob token is missing or invalid. Defaulting to local write.");
        return writeProfileLocal();
      }

      try {
        console.log("[UPLOAD] Trying Vercel Blob profile photo upload...");
        const blob = await put(`profile/image${fileExtension}`, buffer, {
          access: 'public',
        });
        return NextResponse.json({ 
          success: true, 
          url: blob.url 
        });
      } catch (blobError) {
        console.error("[UPLOAD-WARNING] Vercel Blob upload failed (unauthorized or network). Falling back to local storage:", blobError);
        return writeProfileLocal();
      }
    }

    // 2. Generic project/activity image upload branch
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const hasValidTokenPattern = token && token.startsWith('vercel_blob_rw_');

    if (!hasValidTokenPattern) {
      console.warn("[UPLOAD] Vercel Blob token is missing or invalid. Defaulting to local write.");
      return writeGenericLocal();
    }

    try {
      console.log("[UPLOAD] Trying Vercel Blob generic uploader...");
      const blob = await put(`uploads/${cleanFileName}`, buffer, {
        access: 'public',
      });
      return NextResponse.json({ 
        success: true, 
        url: blob.url 
      });
    } catch (blobError) {
      console.error("[UPLOAD-WARNING] Vercel Blob upload failed. Falling back to local storage:", blobError);
      return writeGenericLocal();
    }

  } catch (error) {
    console.error("Self-healing multi-mode uploader failed entirely:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
