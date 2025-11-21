import { Module, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedItems } from '@database/seeds/items.seed';

@Module({})
export class SeedModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Running migrations...');
      await this.dataSource.runMigrations();

      console.log('Running seeder...');
      await seedItems(this.dataSource);

      console.log('Seeder completed.');
    }
  }
}
