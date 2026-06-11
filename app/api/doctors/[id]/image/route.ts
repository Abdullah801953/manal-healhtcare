import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

const UPLOAD_BASE = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
};

// GET doctor image - serves image as binary with caching
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const doctor = await Doctor.findById(id).select('image').lean();

    if (!doctor || !doctor.image || typeof doctor.image !== 'string') {
      return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
    }

    const img = doctor.image as string;

    // File path stored by the upload API (e.g. /api/uploads/doctors/file.jpg or /uploads/doctors/file.jpg)
    if (!img.startsWith('data:')) {
      // Strip /api/uploads/ or /uploads/ prefix to get the relative path inside UPLOAD_BASE
      const relativePath = img
        .replace(/^\/api\/uploads\//, '')
        .replace(/^\/uploads\//, '');

      const fullPath = path.join(UPLOAD_BASE, relativePath);

      // Security: prevent directory traversal
      if (!fullPath.startsWith(UPLOAD_BASE)) {
        return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
      }

      try {
        const fileBuffer = await readFile(fullPath);
        const ext = path.extname(fullPath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'image/jpeg';
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache, must-revalidate',
          },
        });
      } catch {
        // File not found on disk — fall back to placeholder
        return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
      }
    }

    // Base64 data URI: data:image/png;base64,xxxxx
    const matches = img.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, must-revalidate',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('GET /api/doctors/[id]/image error:', error.message);
    return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
  }
}
