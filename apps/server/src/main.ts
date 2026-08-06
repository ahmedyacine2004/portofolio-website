import helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { setupSwagger } from './common/swagger/swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('app.port');

  const frontendUrl = configService.getOrThrow<string>('app.frontendUrl');

  const httpAdapter = app.getHttpAdapter();

  /*
   |--------------------------------------------------------------------------
   | Security Headers
   |--------------------------------------------------------------------------
   */

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  /*
   |--------------------------------------------------------------------------
   | CORS
   |--------------------------------------------------------------------------
   */

  app.enableCors({
    origin: [frontendUrl],

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /*
   |--------------------------------------------------------------------------
   | Global Pipes
   |--------------------------------------------------------------------------
   */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /*
   |--------------------------------------------------------------------------
   | Global Filters
   |--------------------------------------------------------------------------
   */

  app.useGlobalFilters(new GlobalExceptionFilter());

  /*
   |--------------------------------------------------------------------------
   | Swagger
   |--------------------------------------------------------------------------
   */

  setupSwagger(app);

  httpAdapter.getInstance().disable('x-powered-by');
  httpAdapter.getInstance().set('trust proxy', 1);

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
void bootstrap();
