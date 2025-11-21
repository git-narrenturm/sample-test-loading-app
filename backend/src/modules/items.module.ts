import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from '@controllers/items.controller';
import { ItemsService } from '@services/items.service';
import { Item } from '@database/entities/items.entity';


@Module({
imports: [TypeOrmModule.forFeature([Item])],
controllers: [ItemsController],
providers: [ItemsService],
})
export class ItemsModule {}