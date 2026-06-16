import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Settings from '@/lib/models/Settings';
import { getCache, setCache, deleteCache, TTL } from '@/lib/cache';

const SETTINGS_KEY = 'settings';

// GET - Fetch settings (returns first/only document)
export async function GET() {
  const cached = await getCache(SETTINGS_KEY);
  if (cached) return NextResponse.json({ success: true, data: cached, cached: true });

  try {
    await connectDB();

    // Get the most recently updated settings document
    let settings = await Settings.findOne().sort({ updatedAt: -1 }).lean();

    // If no settings exist, create default
    if (!settings) {
      const newSettings = await Settings.create({
        siteName: 'Manal Healthcare',
        siteEmail: 'info@manalhealthcare.com',
        sitePhone: '+91 123 456 7890',
        whatsappNumber: '+91 987 654 3210',
        address: '123 Healthcare Street, New Delhi, India',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
      });
      settings = newSettings.toObject();
    }

    // Ensure social fields have default empty strings if undefined
    const responseData = {
      ...settings,
      facebook: settings.facebook || '',
      twitter: settings.twitter || '',
      instagram: settings.instagram || '',
      linkedin: settings.linkedin || '',
      youtube: settings.youtube || '',
    };

    await setCache(SETTINGS_KEY, responseData, TTL.LONG);
    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request: Request) {
  try {
    await connectDB();
    await deleteCache(SETTINGS_KEY);
    const body = await request.json();

    let settings = await Settings.findOne();

    if (!settings) {
      // Create if doesn't exist
      settings = await Settings.create(body);
    } else {
      // Update existing
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error: any) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}