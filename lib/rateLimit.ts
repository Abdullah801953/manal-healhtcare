/**
 * In-memory rate limiter (fixed window counter).
 * Works reliably on a VPS with a persistent PM2 process.
 * Not suited for multi-instance / serverless deployments.
 */

interface WindowEntry {
  count: number;
  resetAt: number; // unix ms when the window resets
}

// Module-level store — persists across requests within the same process
const store = new Map<string, WindowEntry>();

// Clean up expired entries every 5 minutes to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // unix ms
}

/**
 * Check rate limit for a given key (e.g. `${ip}:${route}`).
 * @param key     Unique identifier (IP + route)
 * @param limit   Max requests allowed in the window
 * @param windowMs Window size in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  let entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // Start a fresh window
    entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/** Extract the real client IP from Next.js request headers */
export function getClientIp(request: Request): string {
  const headers = (request as any).headers;
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
