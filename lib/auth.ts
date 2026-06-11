import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'admin_session';
const SECRET = process.env.ADMIN_SESSION_SECRET || 'manal-healthcare-admin-session-secret-2026';

// Helper: HMAC-SHA256 using Web Crypto API (Edge-compatible)
async function hmacSign(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Create a signed session token from admin data
export async function createSessionToken(adminId: string, email: string): Promise<string> {
  const payload = JSON.stringify({ id: adminId, email, ts: Date.now() });
  const signature = await hmacSign(payload);
  const token = btoa(payload) + '.' + signature;
  return token;
}

// Verify and decode a session token
export async function verifySessionToken(token: string): Promise<{ id: string; email: string; ts: number } | null> {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;
    
    const payload = atob(payloadB64);
    const expectedSig = await hmacSign(payload);
    
    if (signature !== expectedSig) return null;
    
    const data = JSON.parse(payload);
    
    // Token expires after 24 hours
    if (Date.now() - data.ts > 24 * 60 * 60 * 1000) return null;
    
    return data;
  } catch {
    return null;
  }
}

// Verify admin session from request cookies
export async function verifyAdmin(request: NextRequest): Promise<{ id: string; email: string } | null> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Create a response with admin session cookie set
export async function setAdminCookie(response: NextResponse, adminId: string, email: string): Promise<NextResponse> {
  const token = await createSessionToken(adminId, email);
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60, // 24 hours
  });
  return response;
}

// Return 401 unauthorized response
export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, message: 'Unauthorized - admin login required' },
    { status: 401 }
  );
}
