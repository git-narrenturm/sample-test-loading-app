import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { createSwaggerConfig } from './swagger.config';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const isDev = configService.get('NODE_ENV') !== 'production';

  if (!isDev) {
    return;
  }

  const swaggerConfig = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);
}
