import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis);

class Cache {
  constructor() {
    // this.client = redis.createClient(process.env.REDIS_URL);
    this.client = redis.createClient(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  get(key) {
    return this.client.getAsync(key);
  }

  set(key, data) {
    return this.client.setAsync(key, data);
  }

  setExpire(key, data, ttl) {
    return this.client.setAsync(key, data, 'EX', ttl);
  }

  hincrby(hash, key, data) {
    return this.client.hincrbyAsync(hash, key, data);
  }

  smembers(key) {
    return this.client.smembersAsync(key);
  }

  sadd(key, data) {
    return this.client.saddAsync(key, data);
  }

  srem(key, data) {
    return this.client.sremAsync(key, data);
  }

  delete(key) {
    return this.client.del(key);
  }
}

export default new Cache();
