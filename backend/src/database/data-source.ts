import dotenv from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Item } from '@entities/items.entity';
import { SeedItems } from './migrations/items.migration';

dotenv.config()

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Item],
  synchronize: false,
  logging: false,
  migrations: [SeedItems]
};
