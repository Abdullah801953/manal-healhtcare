import { NextRequest, NextResponse } from 'next/server';

// All assets are now stored on Cloudinary.
// Legacy /api/uploads/ paths (pre-Cloudinary) redirect to a placeholder.
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/indra.avif', request.url), { status: 302 });
}
