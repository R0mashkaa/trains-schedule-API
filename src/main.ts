import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfig } from '@app/config';
import { AppModule } from './app.module';
import { setupCors } from './setup-cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const port = getConfig().port;
  const isDevelopment = getConfig().node_env === 'development';

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (isDevelopment) {
    const options = new DocumentBuilder()
      .setTitle('Train Schedule API')
      .setDescription('API Gateway')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  setupCors(app);
  await app.listen(port);
}
bootstrap();
