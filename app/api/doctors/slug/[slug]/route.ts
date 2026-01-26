import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const doctor = await Doctor.findOne({ slug });

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
