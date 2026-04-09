import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { TagsModule } from './modules/tags/tags.module';
import { TeachersModule } from './modules/teachers/teachers.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // serve public/uploads as /uploads
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ranking Docentes API')
    .setDescription('Documentación de endpoints')
    .setVersion('1.0')
    .build();

  // Create documentation for the whole app so all controllers (tags, teachers, ...) are included
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
