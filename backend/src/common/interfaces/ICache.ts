export interface ICache {
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  get<T>(key: string): Promise<T | undefined>;
  del(key: string): Promise<void>;
}