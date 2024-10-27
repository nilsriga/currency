import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getRoutes(): string {
    return this.appService.getRoutes();
  }

  @Get("/debug-sentry")
  getError() {
    throw new Error("testing sentry works");
  }
}
