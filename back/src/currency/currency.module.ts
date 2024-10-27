// Import necessary modules from NestJS and other libraries
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';

// Use the Module decorator to define the CurrencyModule
@Module({
  imports: [
    HttpModule, // Import HttpModule to make HTTP requests
    TypeOrmModule.forFeature([CurrencyRate]) // Import TypeOrmModule and specify the CurrencyRate entity
  ],
  controllers: [CurrencyController], // Specify the controllers to be used
  providers: [CurrencyService], // Specify the providers to be used
  exports: [CurrencyService] // Export the CurrencyService to be used in other modules
})
export class CurrencyModule {}
