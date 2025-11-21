import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '@database/entities/items.entity';
import { GetItemsDto } from '@services/dto/items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  async findAll(query: GetItemsDto) {
    const {
      limit = 20,
      page = 1,
      sortBy = 'created_at',
      sortDir = 'ASC',
    } = query;
    const [items, total] = await this.repo.findAndCount({
      order: { [sortBy]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,  
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }
}
