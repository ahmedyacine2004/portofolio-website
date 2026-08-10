import fs from 'node:fs';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const rawFilename = searchParams.get('filename') || searchParams.get('file');

    if (!rawFilename) {
      return new NextResponse('Missing required query parameter: "filename"', { status: 400 });
    }

    // Sanitize filename to prevent path traversal
    const cleanName = path.basename(rawFilename).replace(/\.docx$/i, '');
    const targetFileName = `${cleanName}.docx`;

    // Candidate lookup paths across monorepo and standalone layouts
    const possiblePaths = [
      path.join(process.cwd(), 'apps', 'client', 'public', 'documents', targetFileName),
      path.join(process.cwd(), 'public', 'documents', targetFileName),
      path.join(process.cwd(), '..', 'public', 'documents', targetFileName),
    ];

    let matchedPath: string | null = null;

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        matchedPath = p;
        break;
      }
    }

    if (!matchedPath) {
      return new NextResponse(
        `File "${targetFileName}" not found. Checked paths:\n${possiblePaths.join('\n')}`,
        { status: 404 },
      );
    }

    const fileBuffer = fs.readFileSync(matchedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Length': fileBuffer.byteLength.toString(),
        'Content-Disposition': `inline; filename="${targetFileName}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[API /api/docx error]:', error);
    return new NextResponse(`Server error: ${errorMessage}`, { status: 500 });
  }
}
