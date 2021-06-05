import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = 3001;
const logger = new Logger("main.ts");

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest模板')
    .setDescription('一个方便快速开发的Nest模板')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-ui', app, document);

  await app.listen(port);
}
bootstrap().then(() => logger.debug(`listen in https://localhost:${port}/api-ui`));