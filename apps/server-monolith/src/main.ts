import { NestFactory } from '@nestjs/core';
import { add, type IAppConfig, subtract, Post } from '@core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: IAppConfig = {
    port: 5000,
  };

  const post = new Post();

  post.title = 'Hello World';

  console.log(config, add(1, 2), subtract(3, 1), post.title);

  await app.listen(5000);
}
bootstrap();
