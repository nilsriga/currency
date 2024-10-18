import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CurrencyRates } from '../entity/currency-rates.entity';

@Module({
  imports: [HttpModule],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}
