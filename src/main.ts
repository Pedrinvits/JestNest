import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
       transform : true,
       // nao salva os dados que nao batem com o DTO
       whitelist : true,
       // lanca um erro se os dados nao baterem com o DTO
       forbidNonWhitelisted : true,
    })
  )
  useContainer(app.select(AppModule),{ fallbackOnErrors : true});
  await app.listen(3000);
}
bootstrap();
