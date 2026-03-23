// recommend.controller.ts — HTTP request handler
// Exposes GET /recommend?q=<query> and returns vitamin recommendations.

import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendResponse } from './vitamin.interface';

@Controller('recommend')
export class RecommendController {
  // NestJS injects RecommendService automatically via constructor injection
  constructor(private readonly recommendService: RecommendService) {}

  /**
   * GET /recommend?q=eye+fatigue
   *
   * Query param:
   *   q (string) — the symptom, food, or condition to look up
   *
   * Returns:
   *   RecommendResponse — { input, vitamins[] }
   */
  @Get()
  getRecommendation(@Query('q') query: string): RecommendResponse {
    // Validate that the query param was actually provided
    if (!query || query.trim() === '') {
      throw new BadRequestException(
        'Please provide a search term using ?q=your+query',
      );
    }

    // Delegate business logic to the service layer
    return this.recommendService.getRecommendations(query);
  }
}