import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';

// GET all inquiries
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: any = {};
    if (status && status !== 'all') query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch inquiries',
      },
      { status: 500 }
    );
  }
}

// POST create new inquiry
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const inquiry = await Inquiry.create(body);

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create inquiry',
      },
      { status: 500 }
    );
  }
}

// DELETE multiple inquiries
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { ids } = await request.json();

    await Inquiry.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: 'Inquiries deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting inquiries:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete inquiries',
      },
      { status: 500 }
    );
  }
}
