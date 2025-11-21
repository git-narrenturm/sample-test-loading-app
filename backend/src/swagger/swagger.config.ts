import { DocumentBuilder } from '@nestjs/swagger';

export const createSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Sample Test Loading App')
    .setDescription('Простое приложение для тестирования производительности эндпоинта')
    .setVersion('1.0.0')
    .addTag('Item')
    .build();
};
