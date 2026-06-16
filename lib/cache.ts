import redis from './redis';

const DEFAULT_TTL = 5 * 60; // 5 minutes in seconds

/**
 * Get cached value. Returns null on cache miss OR if Redis is unavailable.
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const value = await redis.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch {
    return null; // graceful degradation
  }
}

/**
 * Store value in cache.
 * @param ttl seconds (default 5 min)
 */
export async function setCache(key: string, data: unknown, ttl = DEFAULT_TTL): Promise<void> {
  try {
    await redis.set(key, JSON.stringify(data), 'EX', ttl);
  } catch {
    // silently skip — caching is optional
  }
}

/**
 * Delete one or more exact cache keys.
 */
export async function deleteCache(...keys: string[]): Promise<void> {
  try {
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // ignore
  }
}

/**
 * Delete all keys matching a glob pattern (e.g. "doctors:*").
 * Uses SCAN to avoid blocking Redis with KEYS on large datasets.
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  try {
    let cursor = '0';
    do {
      const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      if (keys.length > 0) await redis.del(...keys);
    } while (cursor !== '0');
  } catch {
    // ignore
  }
}

/**
 * Build a stable cache key from a route name and URLSearchParams.
 * e.g. cacheKey('doctors', params) → "doctors:status=active"
 */
export function cacheKey(route: string, params?: URLSearchParams): string {
  if (!params) return route;
  // Sort params for stable keys regardless of query-string order
  const sorted = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
  return sorted ? `${route}:${sorted}` : route;
}

// TTL constants (seconds) — export for use in routes
export const TTL = {
  SHORT:  2 * 60,   //  2 min — frequently changing data
  MEDIUM: 5 * 60,   //  5 min — default
  LONG:  10 * 60,   // 10 min — rarely changing data
};
