import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

// GET single doctor by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const doctor = await Doctor.findById(params.id);

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: 'Doctor not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: doctor
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch doctor',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// PUT update doctor
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();

    const doctor = await Doctor.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: 'Doctor not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update doctor',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE single doctor
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const doctor = await Doctor.findByIdAndDelete(params.id);

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: 'Doctor not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete doctor',
        error: error.message
      },
      { status: 500 }
    );
  }
}
