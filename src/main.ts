import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loadEnvVariables } from './config/db/db.loader';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swagger.config';

async function bootstrap() {
  await loadEnvVariables();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  await app.listen(3001);
}

bootstrap();
