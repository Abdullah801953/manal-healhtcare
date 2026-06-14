import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';
import { verifyAdmin } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    // Verify admin session
    const session = await verifyAdmin(request);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newEmail, newPassword, confirmPassword } = body;

    if (!currentPassword) {
      return NextResponse.json(
        { success: false, message: 'Current password is required' },
        { status: 400 }
      );
    }

    if (!newEmail && !newPassword) {
      return NextResponse.json(
        { success: false, message: 'Provide a new email or new password to update' },
        { status: 400 }
      );
    }

    if (newPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'New passwords do not match' },
        { status: 400 }
      );
    }

    if (newPassword && newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    const admin = await Admin.findById(session.id);
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Check new email is not already taken by another admin
    if (newEmail && newEmail.toLowerCase() !== admin.email) {
      const existing = await Admin.findOne({ email: newEmail.toLowerCase() });
      if (existing) {
        return NextResponse.json(
          { success: false, message: 'Email is already in use' },
          { status: 400 }
        );
      }
      admin.email = newEmail.toLowerCase().trim();
    }

    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 12);
    }

    await admin.save();

    return NextResponse.json({ success: true, message: 'Credentials updated successfully' });
  } catch (error: any) {
    console.error('change-credentials error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
