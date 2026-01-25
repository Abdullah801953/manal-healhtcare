import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';

// This API is for creating the first admin user
// After creating the first admin, you should remove or protect this endpoint
export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();

    // Get request body
    const body = await request.json();
    const { email, password, name, secretKey } = body;

    // Simple protection - you should change this secret key
    if (secretKey !== 'create-admin-2026') {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized'
        },
        { status: 401 }
      );
    }

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email, password, and name are required'
        },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin with this email already exists'
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await Admin.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'admin'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admin created successfully',
        data: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create admin',
        error: error.message
      },
      { status: 500 }
    );
  }
}
