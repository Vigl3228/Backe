import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin:'http://localhost:3000',
  })
  // app.setGlobalPrefix('fiedu');
  await app.listen(3001);
 // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
}
bootstrap();
