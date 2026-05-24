import { NextResponse } from 'next/server';
import { saveContactLog } from '@/lib/dataService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Save to database (or console fallback)
    const saved = await saveContactLog(name, email, message);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Failed to save message." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Terima kasih! Pesan Anda telah berhasil dikirim."
    });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
