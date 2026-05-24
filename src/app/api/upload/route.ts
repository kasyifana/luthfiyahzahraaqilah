import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json(
      { success: false, error: 'Filename is required' },
      { status: 400 }
    );
  }

  // Fallback if Vercel Blob Token is not configured locally
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("BLOB_READ_WRITE_TOKEN is missing. Simulating mock local upload.");
    
    // Simulate short network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      url: `https://raw.githubusercontent.com/file-examples/examples/master/pdf/sample.pdf`, // beautiful placeholder PDF
      downloadUrl: `https://raw.githubusercontent.com/file-examples/examples/master/pdf/sample.pdf`,
      pathname: filename,
      contentType: 'application/pdf'
    });
  }

  try {
    const blob = await put(filename, request.body!, {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      ...blob
    });
  } catch (error) {
    console.error("Vercel Blob upload failed:", error);
    return NextResponse.json(
      { success: false, error: "Vercel Blob upload failed: " + (error as Error).message },
      { status: 500 }
    );
  }
}
