// Import necessary modules and decorators from NestJS and other libraries
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';
import { Cron } from '@nestjs/schedule';

// Use the Injectable decorator to make this service available for dependency injection
@Injectable()
export class CurrencyService {
  // Inject dependencies using the constructor
  constructor(
    private readonly httpService: HttpService, // Service to make HTTP requests
    private readonly configService: ConfigService, // Service to access environment variables
    @InjectRepository(CurrencyRate)
    private readonly currencyRateRepository: Repository<CurrencyRate> // Repository to interact with the CurrencyRate entity
  ) { }

  // Use the Cron decorator to schedule a task to run at specific times
  @Cron('1 30 4,21 * * *')
  async handleCron() {
    // Call the fetchAndStoreRates method to fetch and store currency rates
    await this.fetchAndStoreRates();
  }

  // Method to fetch and store currency rates
  async fetchAndStoreRates(): Promise<string> {
    try {
      // Get the API key from environment variables
      const apiKey = this.configService.get<string>('ANYAPI_KEY');
      // Make an HTTP GET request to fetch currency rates
      const response = await lastValueFrom(
        this.httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`)
      );
      const data = response.data;
      // Convert the timestamp to a Date object
      const date = new Date(data.lastUpdate * 1000);
      let saved = false;
      // Iterate over the currency rates and save them to the database
      for (const [currency, rate] of Object.entries(data.rates)) {
        // Check if the rate for the given date and currency already exists in the database
        const existingRate = await this.currencyRateRepository.findOne({
          where: { date, currency }
        });
        // If the rate does not exist, create a new CurrencyRate entity and save it to the database
        if (!existingRate) {
          const currencyRate = new CurrencyRate();
          currencyRate.date = date;
          currencyRate.currency = currency;
          currencyRate.rate = rate as number;
          await this.currencyRateRepository.save(currencyRate);
          saved = true;
        }
      }
      // Return a message indicating whether new rates were saved or not
      return saved ? "Successful API call and successful saving of rates" : "Successful API call, Nothing to save";
    } catch (error) {
      // Log an error message if there is an error during the API call or saving process
      console.error('Error fetching currency rates:', error);
      throw error;
    }
  }

  // Method to get currency rates by currency with pagination
  async getRatesByCurrency(currency: string, page: number = 1, limit: number = 10) {
    // Find and count the currency rates for the given currency, ordered by date in descending order
    const [results, total] = await this.currencyRateRepository.findAndCount({
      where: { currency: currency.toUpperCase() },
      order: { date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    // Return the results along with pagination information
    return {
      data: results,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
