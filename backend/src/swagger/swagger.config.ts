import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Sample Test Loading App')
    .setDescription('API')
    .setVersion('1.0.0')
    .addTag('Items')
    .build();
};
