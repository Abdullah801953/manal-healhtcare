import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Test: Get all users
    const users = await User.find({});

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        usersCount: users.length,
        users: users
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();

    // Get request body
    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and email are required'
        },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({ name, email });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        data: user
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create user',
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Connect to database
    await connectDB();

    // Delete all users (for testing purposes)
    const result = await User.deleteMany({});

    return NextResponse.json({
      success: true,
      message: 'All users deleted successfully',
      data: {
        deletedCount: result.deletedCount
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete users',
        error: error.message
      },
      { status: 500 }
    );
  }
}
