import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheHelperService {
  private inFlightRequests = new Map<string, Promise<any>>();

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async staleWhileRevalidate<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl = 60,
  ): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);

    if (cached) {
      if (!this.inFlightRequests.has(key)) {
        const refreshPromise = (async () => {
          try {
            const fresh = await fetchFn();
            await this.cacheManager.set(key, fresh, ttl);
          } finally {
            this.inFlightRequests.delete(key);
          }
        })();

        this.inFlightRequests.set(key, refreshPromise);
      }
      return cached;
    }

    const data = await fetchFn();

    await this.cacheManager.set(
      key,
      data,
      ttl + Math.floor(Math.random() * 10),
    );

    return data;
  }
}
