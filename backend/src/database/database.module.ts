import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@database/data-source';
import { Item } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([Item]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
