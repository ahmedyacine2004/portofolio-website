import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'documents', 'estin.pdf');

    if (!fs.existsSync(filePath)) {
      return new NextResponse(
        'File "estin.pdf" was not found on disk at public/documents/estin.pdf',
        { status: 404 },
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': fileBuffer.byteLength.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[API /api/pdf/estin error]:', error);
    return new NextResponse(`Server error: ${errorMessage}`, { status: 500 });
  }
}
