import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path'
import * as express from 'express';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use('/uploads',express.static(join(__dirname,'..','uploads')))
  await app.listen(3000);
}
bootstrap();
