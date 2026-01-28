import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

// GET single inquiry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inquiry not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error: any) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch inquiry',
      },
      { status: 500 }
    );
  }
}

// PUT update inquiry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await request.json();

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inquiry not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update inquiry',
      },
      { status: 500 }
    );
  }
}

// DELETE single inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          error: 'Inquiry not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete inquiry',
      },
      { status: 500 }
    );
  }
}
