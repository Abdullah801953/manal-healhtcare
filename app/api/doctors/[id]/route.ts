import { NextResponse } from 'next/server';
import connectDB, { resetConnection } from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

// Helper: Check if error is a timeout
function isTimeoutError(error: any): boolean {
  return error.message?.includes('timed out') || error.message?.includes('ETIMEDOUT');
}

// GET single doctor by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return NextResponse.json(
          { success: false, message: 'Doctor not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: doctor });
    } catch (error: any) {
      if (isTimeoutError(error) && attempt < MAX_RETRIES) {
        resetConnection();
        continue;
      }
      return NextResponse.json(
        { success: false, message: 'Failed to fetch doctor', error: error.message },
        { status: 500 }
      );
    }
  }
}

// PUT update doctor
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const doctor = await Doctor.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true }
      );

      if (!doctor) {
        return NextResponse.json(
          { success: false, message: 'Doctor not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Doctor updated successfully',
        data: doctor
      });
    } catch (error: any) {
      if (isTimeoutError(error) && attempt < MAX_RETRIES) {
        resetConnection();
        continue;
      }
      return NextResponse.json(
        { success: false, message: 'Failed to update doctor', error: error.message },
        { status: 500 }
      );
    }
  }
}

// DELETE single doctor
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await connectDB();
      const doctor = await Doctor.findByIdAndDelete(id);

      if (!doctor) {
        return NextResponse.json(
          { success: false, message: 'Doctor not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Doctor deleted successfully'
      });
    } catch (error: any) {
      if (isTimeoutError(error) && attempt < MAX_RETRIES) {
        resetConnection();
        continue;
      }
      return NextResponse.json(
        { success: false, message: 'Failed to delete doctor', error: error.message },
        { status: 500 }
      );
    }
  }
}
