import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Waifu List')
    .setDescription('System to catalog waifus.')
    .setVersion('1.0.0')
    .setLicense('MIT', 'https://github.com/pedroo-csproj/waifu-list/blob/main/LICENSE')
    .setContact('Pedro Octávio', 'https://github.com/pedroo-csproj', 'pedrooctavio.dev@outlook.com')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(5001);
}

bootstrap();
