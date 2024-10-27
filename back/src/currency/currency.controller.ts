// Import necessary modules from NestJS common module
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

// Use the Controller decorator to define a controller with the route 'currency'
@Controller('currency')
export class CurrencyController {
  // Inject the CurrencyService using the constructor
  constructor(private readonly currencyService: CurrencyService) {}

  // Define a GET endpoint to get rates by currency
  @Get(':currency')
  async getRatesByCurrency(
    @Param('currency') currency: string, // Get the currency parameter from the route
    @Query('page') page: number = 1, // Get the page query parameter, default to 1 if not set
    @Query('limit') limit: number = 10 // Get the limit query parameter, default to 10 if not set
  ) {
    // Call the getRatesByCurrency method from CurrencyService
    return this.currencyService.getRatesByCurrency(currency, page, limit);
  }
}
