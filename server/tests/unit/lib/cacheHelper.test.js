import { expect } from "chai";
import CacheHandler from "../../../lib/cacheHandler.js";

describe("CacheHandler", () => {
  let cache;

  before(async () => {
    cache = new CacheHandler.CacheHandler();
  });

  after(async () => {
    await cache.flushAll();
    await cache.disconnect();
  });

  it("should set and get a value", async () => {
    const key = "testKey";
    const value = { message: "Hello, Redis!" };

    await cache.set(key, value, 60); // Set with 60 seconds TTL
    const result = await cache.get(key);

    expect(result).to.deep.equal(value);
  });

  it("should return null for a non-existent key", async () => {
    const result = await cache.get("nonExistentKey");
    expect(result).to.be.null;
  });

  it("should delete a key", async () => {
    const key = "deleteKey";
    const value = { data: "To be deleted" };

    await cache.set(key, value);
    await cache.del(key);

    const result = await cache.get(key);
    expect(result).to.be.null;
  });

  it("should flush all keys", async () => {
    const key1 = "key1";
    const key2 = "key2";

    await cache.set(key1, { message: "Key 1" });
    await cache.set(key2, { message: "Key 2" });

    await cache.flushAll();

    const result1 = await cache.get(key1);
    const result2 = await cache.get(key2);

    expect(result1).to.be.null;
    expect(result2).to.be.null;
  });
});
