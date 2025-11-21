import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from '@controllers/items.controller';
import { ItemsService } from '@services/items.service';
import { Item } from '@database/entities/item.entity';
import { RedisService } from '@services/redis.service';
import { RedisModule } from './redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), RedisModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
