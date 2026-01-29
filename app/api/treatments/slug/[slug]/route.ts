import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Treatment from '@/lib/models/Treatment';

// GET single treatment by slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const treatment = await Treatment.findOne({ slug });

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
