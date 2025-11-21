import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '@entities/item.entity';
import { RedisService } from '@services/redis.service';
import { GetItemsDto } from '@services/dto/items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly repo: Repository<Item>,
    private readonly redisService: RedisService,
  ) {}

  async findAll(query: GetItemsDto) {
    const redis = this.redisService.getClient();

    const {
      limit = 20,
      page = 1,
      sortBy = 'id',
      sortDir = 'ASC',
    } = query;
    const key = `items:${limit}:${page}:${sortBy}:${sortDir}`;

    if (redis) {
      const cached = await redis.get(key);
      if (cached) {
        const obj = JSON.parse(cached);
        obj.cached = true;
        return obj;
      }
    }

    const [items, total] = await this.repo.findAndCount({
      order: { [sortBy]: sortDir },
      take: limit,
      skip: (page - 1) * limit,
    });

    const response = {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      cached: false,
    };

    if (redis) {
      await redis.set(key, JSON.stringify(response), 'EX', 30);
    }

    return response;
  }
}
