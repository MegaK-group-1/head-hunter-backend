import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MegaK - Group 1')
  .setDescription('The head-hunters API description')
  .setVersion('1.0')
  .addCookieAuth('jwt')
  .addBearerAuth()
  .addTag('head-hunters')
  .build();
