import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

// GET all doctors
export async function GET() {
  try {
    await connectDB();
    const doctors = await Doctor.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: doctors
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch doctors',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// POST create new doctor
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'designation', 'hospital', 'overview', 'experience', 'experienceYears'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required`
          },
          { status: 400 }
        );
      }
    }

    const doctor = await Doctor.create(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Doctor created successfully',
        data: doctor
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create doctor',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE multiple doctors
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Doctor IDs are required'
        },
        { status: 400 }
      );
    }

    const result = await Doctor.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} doctor(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete doctors',
        error: error.message
      },
      { status: 500 }
    );
  }
}
