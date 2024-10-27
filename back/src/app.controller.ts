// Import necessary modules from NestJS common module
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Use the Controller decorator to define a controller
@Controller()
export class AppController {
  // Inject the AppService using the constructor
  constructor(private readonly appService: AppService) { }

  // Define a GET endpoint that returns available routes
  @Get()
  getRoutes(): string {
    // Call the getRoutes method from AppService
    return this.appService.getRoutes();
  }

  // Define a GET endpoint for debugging Sentry
  @Get("/debug-sentry")
  getError() {
    // Throw an error to test Sentry integration
    throw new Error("testing sentry works");
  }
}
