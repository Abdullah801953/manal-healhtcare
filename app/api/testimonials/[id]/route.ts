import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';

// GET single testimonial by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const testimonial = await Testimonial.findById(params.id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          error: 'Testimonial not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch testimonial',
      },
      { status: 500 }
    );
  }
}

// PUT update testimonial
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();

    const testimonial = await Testimonial.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          error: 'Testimonial not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update testimonial',
      },
      { status: 500 }
    );
  }
}

// DELETE single testimonial
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const testimonial = await Testimonial.findByIdAndDelete(params.id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          error: 'Testimonial not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete testimonial',
      },
      { status: 500 }
    );
  }
}
