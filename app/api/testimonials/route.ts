import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const verified = searchParams.get('verified');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (verified) query.verified = verified === 'true';
    if (featured) query.featured = featured === 'true';
    if (category && category !== 'All') query.category = category;

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: testimonials,
    });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch testimonials',
      },
      { status: 500 }
    );
  }
}

// POST create new testimonial
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const testimonial = await Testimonial.create(body);

    return NextResponse.json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create testimonial',
      },
      { status: 500 }
    );
  }
}

// DELETE multiple testimonials
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No testimonial IDs provided',
        },
        { status: 400 }
      );
    }

    await Testimonial.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${ids.length} testimonial(s) deleted successfully`,
    });
  } catch (error: any) {
    console.error('Error deleting testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete testimonials',
      },
      { status: 500 }
    );
  }
}
