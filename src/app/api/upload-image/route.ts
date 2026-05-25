import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// True ONLY on Vercel's actual cloud servers (read-only filesystem)
const ON_VERCEL = process.env.VERCEL === '1';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const isProfile = formData.get('isProfile') === 'true';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file was uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = path.extname(file.name) || '.png';
    const cleanFileName = `uploaded_${Date.now()}${fileExtension}`;

    const blobPath = isProfile ? `profile/image${fileExtension}` : `uploads/${cleanFileName}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const hasValidToken = token && token.startsWith('vercel_blob_rw_');

    // --- CLOUD PATH: Try Vercel Blob if valid token exists ---
    if (hasValidToken) {
      try {
        console.log(`[UPLOAD] Uploading to Vercel Blob: ${blobPath}`);
        const blob = await put(blobPath, buffer, { access: 'public' });
        console.log(`[UPLOAD] Success: ${blob.url}`);
        return NextResponse.json({ success: true, url: blob.url });
      } catch (blobError) {
        const errMsg = blobError instanceof Error ? blobError.message : String(blobError);
        console.error('[UPLOAD] Vercel Blob upload failed:', errMsg);
        if (ON_VERCEL) {
          return NextResponse.json(
            { success: false, error: `Vercel Blob error: ${errMsg}` },
            { status: 500 }
          );
        }
        // On local dev, fall through to local disk write
      }
    }

    // --- LOCAL PATH: Write to disk (only works on local dev) ---
    if (ON_VERCEL) {
      // No valid token and on Vercel - explain the issue clearly
      console.error('[UPLOAD] No valid BLOB_READ_WRITE_TOKEN found. Cannot write to Vercel read-only filesystem.');
      return NextResponse.json(
        {
          success: false,
          error: 'Image upload requires a valid BLOB_READ_WRITE_TOKEN. Please connect a Vercel Blob store in your Vercel project settings (Storage tab), then redeploy.'
        },
        { status: 500 }
      );
    }

    // Local development fallback - write to public folder
    if (isProfile) {
      console.log('[UPLOAD-LOCAL] Saving profile image to local disk.');
      const targetPath = path.join(process.cwd(), 'public', 'images', 'profile', 'image.png');
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, buffer);
      return NextResponse.json({ success: true, url: `/images/profile/image.png?t=${Date.now()}` });
    } else {
      console.log('[UPLOAD-LOCAL] Saving image to local uploads folder.');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      fs.mkdirSync(uploadDir, { recursive: true });
      fs.writeFileSync(path.join(uploadDir, cleanFileName), buffer);
      return NextResponse.json({ success: true, url: `/uploads/${cleanFileName}` });
    }

  } catch (error) {
    console.error('[UPLOAD] Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
