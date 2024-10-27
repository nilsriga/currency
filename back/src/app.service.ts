// Import the Injectable decorator from NestJS common module
import { Injectable } from '@nestjs/common';

// Use the Injectable decorator to make this service available for dependency injection
@Injectable()
export class AppService {
  // Method to get available routes
  getRoutes(): string {
    // Return a string listing the available endpoints
    return `Available endpoints: \n - GET 'currency/usd?page=1&limit=10'`;
  }
}
