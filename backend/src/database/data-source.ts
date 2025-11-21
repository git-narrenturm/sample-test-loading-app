import * as path from 'path';
import dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Item } from '@entities/item.entity';

dotenv.config();

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
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  extra: {
    max: 20,
  },
  retryAttempts: 10,
  retryDelay: 3000,
};
