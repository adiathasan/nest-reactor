import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );

  app.enableCors();

  app.setGlobalPrefix('api');

  await app.listen(5000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then((r) => r);
