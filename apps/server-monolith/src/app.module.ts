import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './core/config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@server/user/user.module';
import { TransformInterceptor } from '@server/core/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().database.uri),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
