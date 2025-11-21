import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'redis');
    const port = this.configService.get<number>('REDIS_PORT', 6379);

    let connected = false;
    while (!connected) {
      try {
        this.client = new Redis({ host, port });
        await this.client.ping();
        console.log('Redis connected');
        connected = true;
      } catch (err) {
        console.warn('Redis not ready, retrying in 1s...');
        await new Promise(res => setTimeout(res, 1000));
      }
    }

    this.client.on('error', (err) => console.error('Redis error:', err));
  }

  getClient() {
    return this.client;
  }
}

