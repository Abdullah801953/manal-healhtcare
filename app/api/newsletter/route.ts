import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/lib/models/Newsletter';

// GET - Fetch all newsletter subscribers
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query: any = {};
    if (status) {
      query.status = status;
    }

    const subscribers = await Newsletter.find(query).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: subscribers,
    });
  } catch (error: any) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Subscribe to newsletter
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate subscription
        existingSubscriber.status = 'active';
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: existingSubscriber,
        });
      }
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const subscriber = await Newsletter.create({ email });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        data: subscriber,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete multiple subscribers
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',');

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No IDs provided' },
        { status: 400 }
      );
    }

    await Newsletter.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${ids.length} subscriber(s)`,
    });
  } catch (error: any) {
    console.error('Error deleting subscribers:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}