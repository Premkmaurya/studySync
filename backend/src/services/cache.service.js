const DEFAULT_TTL_SECONDS = 60;

const memoryCache = new Map();
let redisClient = null;
let isRedisEnabled = false;

function nowInSeconds() {
  return Math.floor(Date.now() / 1000);
}

function buildCacheKey(...parts) {
  return parts.filter(Boolean).join(":");
}

async function initCache() {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    console.log("⚠️ REDIS_URL not set. Using in-memory cache fallback.");
    return;
  }

  try {
    const { createClient } = require("redis");
    redisClient = createClient({ url: redisUrl });

    redisClient.on("error", (error) => {
      console.error("Redis error:", error.message);
    });

    await redisClient.connect();
    isRedisEnabled = true;
    console.log("✅ Redis cache connected.");
  } catch (error) {
    console.error(
      "⚠️ Unable to initialize Redis. Falling back to in-memory cache:",
      error.message
    );
    redisClient = null;
    isRedisEnabled = false;
  }
}

async function getCachedData(key) {
  if (isRedisEnabled && redisClient) {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  const cached = memoryCache.get(key);
  if (!cached) return null;

  if (cached.expiresAt <= nowInSeconds()) {
    memoryCache.delete(key);
    return null;
  }

  return cached.value;
}

async function setCachedData(key, value, ttlSeconds = DEFAULT_TTL_SECONDS) {
  if (isRedisEnabled && redisClient) {
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
    return;
  }

  memoryCache.set(key, {
    value,
    expiresAt: nowInSeconds() + ttlSeconds,
  });
}

async function invalidateCacheKeys(keys = []) {
  if (!Array.isArray(keys) || keys.length === 0) return;

  if (isRedisEnabled && redisClient) {
    await redisClient.del(keys);
  }

  keys.forEach((key) => memoryCache.delete(key));
}

async function invalidateByPrefix(prefix) {
  if (!prefix) return;

  if (isRedisEnabled && redisClient) {
    let cursor = "0";

    do {
      const result = await redisClient.scan(cursor, {
        MATCH: `${prefix}*`,
        COUNT: 100,
      });

      cursor = result.cursor;
      if (result.keys.length) {
        await redisClient.del(result.keys);
      }
    } while (cursor !== "0");
  }

  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }
}

module.exports = {
  initCache,
  buildCacheKey,
  getCachedData,
  setCachedData,
  invalidateCacheKeys,
  invalidateByPrefix,
};
