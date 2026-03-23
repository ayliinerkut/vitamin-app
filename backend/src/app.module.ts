// app.module.ts — Root module of the NestJS application
// Registers all controllers and providers used in this app.

import { Module } from '@nestjs/common';
import { RecommendController } from './recommend/recommend.controller';
import { RecommendService } from './recommend/recommend.service';

@Module({
  imports: [],
  controllers: [RecommendController], // HTTP request handlers
  providers: [RecommendService],      // Business logic / data layer
})
export class AppModule {}
