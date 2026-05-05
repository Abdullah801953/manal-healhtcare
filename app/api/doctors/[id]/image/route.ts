import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

// GET doctor image - serves base64 as binary image with caching
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const doctor = await Doctor.findById(id).select('image').lean();

    if (!doctor || !doctor.image || typeof doctor.image !== 'string') {
      // Redirect to placeholder if no image
      return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
    }

    // If image is a file path (uploaded to server), redirect to it directly
    if (!doctor.image.startsWith('data:')) {
      return NextResponse.redirect(new URL(doctor.image, request.url));
    }

    // Parse base64 data URI: data:image/png;base64,xxxxx
    const matches = (doctor.image as string).match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) {
      return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('GET /api/doctors/[id]/image error:', error.message);
    return NextResponse.redirect(new URL('/doctor-img 1.png', request.url));
  }
}
