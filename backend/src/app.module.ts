import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { ItemsModule } from '@modules/items.module';
import { SeedModule } from '@modules/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ItemsModule,
    SeedModule
  ],
})
export class AppModule {}
