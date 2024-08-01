import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({strictGroups: true}))
  await app.listen(3000);
}
bootstrap();

// https://whimsical.com/filas-RYyTNtqdnS7MgjCT52G7E7
