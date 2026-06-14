import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

const PLACEHOLDER = '/doctor-img 1.png';

// GET doctor image — redirects to Cloudinary CDN URL (or falls back to placeholder)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const doctor = await Doctor.findById(id).select('image').lean();

    if (!doctor || !doctor.image || typeof doctor.image !== 'string') {
      return NextResponse.redirect(new URL(PLACEHOLDER, request.url));
    }

    const img = doctor.image as string;

    // Cloudinary / external URL — redirect directly
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return NextResponse.redirect(img, { status: 302 });
    }

    // Legacy local path — files no longer exist after Cloudinary migration, show placeholder
    if (img.startsWith('/')) {
      return NextResponse.redirect(new URL(PLACEHOLDER, request.url));
    }

    // Legacy base64 data URI
    const matches = img.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      const buffer = Buffer.from(matches[2], 'base64');
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': matches[1],
          'Cache-Control': 'no-cache, must-revalidate',
          'Content-Length': buffer.length.toString(),
        },
      });
    }

    return NextResponse.redirect(new URL(PLACEHOLDER, request.url));
  } catch (error: any) {
    console.error('GET /api/doctors/[id]/image error:', error.message);
    return NextResponse.redirect(new URL(PLACEHOLDER, request.url));
  }
}
