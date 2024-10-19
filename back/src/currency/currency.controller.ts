import { Controller, Get, Param, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get(':currency')
  async getRatesByCurrency(
    @Param('currency') currency: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.currencyService.getRatesByCurrency(currency, page, limit);
  }
}
