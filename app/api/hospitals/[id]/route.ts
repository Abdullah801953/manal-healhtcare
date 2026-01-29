import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hospital from '@/lib/models/Hospital';

// GET single hospital by ID or slug
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    // Try to find by slug first, then by ID
    let hospital = await Hospital.findOne({ slug: id });
    if (!hospital) {
      hospital = await Hospital.findById(id);
    }

    if (!hospital) {
      return NextResponse.json(
        {
          success: false,
          message: 'Hospital not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error: any) {
    console.error('Error fetching hospital:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch hospital',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT - Update hospital
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await request.json();

    const hospital = await Hospital.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!hospital) {
      return NextResponse.json(
        {
          success: false,
          message: 'Hospital not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hospital,
      message: 'Hospital updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating hospital:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update hospital',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE hospital
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const hospital = await Hospital.findByIdAndDelete(id);

    if (!hospital) {
      return NextResponse.json(
        {
          success: false,
          message: 'Hospital not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Hospital deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting hospital:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete hospital',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
