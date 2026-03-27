
// main.ts — Entry point for the NestJS application
// This file bootstraps the app, enables CORS, and starts the HTTP server.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow requests from any origin (needed so the frontend HTML file can call this API)
  app.enableCors({
    origin: '*',
  });

  const port = 3001;
  await app.listen(port);
  console.log(`✅ Vitamin API is running at http://localhost:${port}`);
}

bootstrap();
