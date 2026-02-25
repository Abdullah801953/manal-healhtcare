import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Treatment from '@/lib/models/Treatment';

// GET single treatment by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const treatment = await Treatment.findById(id);

    if (!treatment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Treatment not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: treatment
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch treatment',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// PUT update treatment
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const treatment = await Treatment.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!treatment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Treatment not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Treatment updated successfully',
      data: treatment
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update treatment',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE single treatment
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const treatment = await Treatment.findByIdAndDelete(id);

    if (!treatment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Treatment not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Treatment deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete treatment',
        error: error.message
      },
      { status: 500 }
    );
  }
}
