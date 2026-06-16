import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const AUTH_COOKIE_NAME = 'admin_session';

// ---------------------------------------------------------------------------
// Rate limit tiers (requests per 60 seconds per IP)
// ---------------------------------------------------------------------------
const RATE_LIMITS: { pattern: RegExp; limit: number }[] = [
  // Strictest — login brute-force protection
  { pattern: /^\/api\/admin\/login$/,             limit: 5   },
  // Strict — form submissions / uploads
  { pattern: /^\/api\/inquiries$/,                limit: 10  },
  { pattern: /^\/api\/newsletter$/,               limit: 10  },
  { pattern: /^\/api\/upload$/,                   limit: 15  },
  // Strict — credential changes
  { pattern: /^\/api\/admin\/change-credentials$/, limit: 5  },
  // General public GET APIs
  { pattern: /^\/api\//,                          limit: 100 },
];

const WINDOW_MS = 60 * 1000; // 1 minute

function getRateLimit(pathname: string): number {
  for (const rule of RATE_LIMITS) {
    if (rule.pattern.test(pathname)) return rule.limit;
  }
  return 100;
}

function rateLimitResponse(resetAt: number): NextResponse {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
  return NextResponse.json(
    { success: false, message: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
      },
    }
  );
}

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

  // ---------------------------------------------------------------------------
  // Rate limiting — applied to every API route
  // ---------------------------------------------------------------------------
  const ip = getClientIp(request);
  const limit = getRateLimit(pathname);
  const result = rateLimit(`${ip}:${pathname}`, limit, WINDOW_MS);

  if (!result.allowed) {
    return rateLimitResponse(result.resetAt);
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
