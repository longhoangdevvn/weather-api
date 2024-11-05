/**
 * File path: src/configs/cache.config.ts
 */

import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  async createCacheOptions(): Promise<CacheModuleOptions<RedisClientOptions>> {
    return {
      store: await redisStore({
        url: process.env.REDIS_URL,
      }),
    };
  }
}
