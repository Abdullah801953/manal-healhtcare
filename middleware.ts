import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

const AUTH_COOKIE_NAME = 'admin_session';

// Routes that don't require authentication
const PUBLIC_API_ROUTES = [
  '/api/admin/login',
  '/api/doctors',
  '/api/hospitals',
  '/api/treatments',
  '/api/testimonials',
  '/api/blogs',
  '/api/faqs',
  '/api/health',
  '/api/inquiries',
  '/api/newsletter',
  '/api/translate',
  '/api/settings',
  '/api/uploads',  // serve uploaded images publicly
];

// Check if a route is public for GET requests
function isPublicGetRoute(pathname: string): boolean {
  return PUBLIC_API_ROUTES.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const { pathname, method } = { pathname: request.nextUrl.pathname, method: request.method };

  // Only protect API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Allow all GET requests to public API routes (for frontend data fetching)
  if (method === 'GET' && isPublicGetRoute(pathname)) {
    return NextResponse.next();
  }

  // Allow POST to login/logout and public form submissions
  if (method === 'POST' && (pathname === '/api/admin/login' || pathname === '/api/admin/logout')) {
    return NextResponse.next();
  }

  // Allow POST to inquiries (public contact form)
  if (method === 'POST' && pathname === '/api/inquiries') {
    return NextResponse.next();
  }

  // Allow POST to newsletter (public subscription)
  if (method === 'POST' && pathname === '/api/newsletter') {
    return NextResponse.next();
  }

  // Allow POST to translate (public feature)
  if (method === 'POST' && pathname === '/api/translate') {
    return NextResponse.next();
  }

  // Allow POST to upload (needed for public form medical report uploads)
  if (method === 'POST' && pathname === '/api/upload') {
    return NextResponse.next();
  }

  // All other mutation requests require admin authentication
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized - admin login required' },
      { status: 401 }
    );
  }

  const admin = await verifySessionToken(token);
  if (!admin) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized - session expired' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
