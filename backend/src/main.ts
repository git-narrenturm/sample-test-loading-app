import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');

  setupSwagger(app);

  const port = configService.get('PORT') ?? 3000;
  console.log(`The app is running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
