import { NextResponse } from 'next/server';
import { languages } from '@/app/lib/i18n/languages';

// API endpoint to fetch available languages
export async function GET() {
  try {
    // In production, you could fetch this from a database or external API
    // For now, return the static list
    return NextResponse.json(languages);
  } catch (error) {
    console.error('Failed to fetch languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}
