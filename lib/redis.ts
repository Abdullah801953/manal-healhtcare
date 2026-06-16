import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Singleton — reuse connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _redisClient: Redis | null;
}

function createClient(): Redis {
  const client = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 1,   // fail fast, don't block requests
    connectTimeout: 2000,
    lazyConnect: true,
    enableOfflineQueue: false, // drop commands when disconnected
  });

  client.on('error', (err) => {
    // Log but don't crash — app works without Redis (just slower)
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[Redis] connection error:', err.message);
    }
  });

  return client;
}

const redis: Redis = global._redisClient ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  global._redisClient = redis;
}

export default redis;
