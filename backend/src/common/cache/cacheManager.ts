// cache/RedisCacheManager.ts
import Redis from 'ioredis';
import { ICache } from '../interfaces/ICache';
import { redisConfig } from '../../config/config';

export class RedisCacheManager implements ICache {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      username: redisConfig.username,
      password: redisConfig.password,
      db: redisConfig.db,
    });
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const val = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, val, 'EX', ttl);
    } else {
      await this.client.set(key, val);
    }
  }

  async get<T>(key: string): Promise<T | undefined> {
    const val = await this.client.get(key);
    return val ? JSON.parse(val) as T : undefined;
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

}
