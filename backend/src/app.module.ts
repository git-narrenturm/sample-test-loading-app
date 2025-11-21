import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { ItemsModule } from '@modules/items.module';
import { SeedModule } from '@modules/seed.module';
import { RedisModule } from '@modules/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule,
    ItemsModule,
    SeedModule
  ],
})
export class AppModule {}
