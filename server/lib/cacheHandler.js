import redis from 'redis';

class CacheHandler {
  constructor() {
    this.client = redis.createClient({
      url: "redis://localhost:6379",
    });
    this.client.on("error", (err) => console.error("Redis error:", err));
    this.client.connect();
  }

  async set(key, value, ttl = 3600) {
    const stringValue = JSON.stringify(value);
    await this.client.set(key, stringValue, { EX: ttl });
  }

  async get(key) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key) {
    await this.client.del(key);
  }

  async flushAll() {
    await this.client.flushAll();
  }

  async disconnect() {
    await this.client.quit();
  }
}

export default {
    CacheHandler
}
