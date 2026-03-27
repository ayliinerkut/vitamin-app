
// main.ts — Entry point for the NestJS application
// This file bootstraps the app, enables CORS, and starts the HTTP server.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  // Render'ın atadığı portu al, yoksa (lokaldeysen) 3001'i kullan
  const port = process.env.PORT || 3001; 
  
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' eklemek Render için kritiktir
  console.log(`✅ Vitamin API is running on port: ${port}`);
}
bootstrap();
