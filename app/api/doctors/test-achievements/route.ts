import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Doctor from '@/lib/models/Doctor';

export async function GET() {
  try {
    await connectDB();
    
    // Find Dr. Vikas Dua
    const doctor = await Doctor.findOne({ slug: 'dr-vikas-dua' });
    
    if (!doctor) {
      return NextResponse.json({
        success: false,
        message: 'Dr. Vikas Dua not found'
      });
    }

    return NextResponse.json({
      success: true,
      doctor: {
        name: doctor.name,
        slug: doctor.slug,
        achievements: doctor.achievements,
        hasAchievements: !!doctor.achievements,
        achievementsLength: doctor.achievements?.length || 0,
        allFields: Object.keys(doctor.toObject())
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
