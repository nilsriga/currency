// Import necessary modules for testing from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyService } from '../src/currency/currency.service';
import { CurrencyRate } from '../src/db/entities/CurrencyRate.entity';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Describe the test suite for CurrencyService integration tests
describe('CurrencyService Integration (Real DB and HTTP)', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let currencyRateRepository: Repository<CurrencyRate>;

  // Before all tests, create a testing module and compile it
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule, // Import HttpModule to make HTTP requests
        ConfigModule.forRoot({ isGlobal: true }), // Import ConfigModule to manage environment variables
        TypeOrmModule.forRoot({
          type: 'sqlite', // Use SQLite as the database type
          database: ':memory:', // Use an in-memory database for testing
          entities: [CurrencyRate], // Specify the entities to be used by TypeORM
          synchronize: true, // Automatically synchronize the database schema
          logging: false, // Disable logging
        }),
        TypeOrmModule.forFeature([CurrencyRate]), // Import the CurrencyRate entity
      ],
      providers: [CurrencyService, ConfigService], // Provide the CurrencyService and ConfigService
    }).compile();

    // Get instances of CurrencyService, HttpService, and CurrencyRate repository from the testing module
    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    currencyRateRepository = module.get<Repository<CurrencyRate>>(getRepositoryToken(CurrencyRate));
  });

  // After all tests, clear the CurrencyRate repository to clean up
  afterAll(async () => {
    await currencyRateRepository.clear(); // Clean up after tests
  });

  // Helper function to introduce a delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Define a test case to fetch and store rates and validate data retrieval from the database
  it('should fetch and store rates and validate data retrieval from the database', async () => {
    const apiKey = process.env.ANYAPI_KEY;

    // Step 1: Perform the HTTP call to the actual API
    const response = await lastValueFrom(httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`));
    expect(response.status).toBe(200); // Check if the response status is 200 (OK)
    expect(response.data).toHaveProperty('rates'); // Check if the response data has a 'rates' property

    const data = response.data;
    const randomCurrency = Object.keys(data.rates)[Math.floor(Math.random() * Object.keys(data.rates).length)];
    const randomRate = data.rates[randomCurrency];
    const lastUpdate = data.lastUpdate;

    // Step 2: Store the data in the database via the service
    await delay(1000); // Optional delay to mimic real-world timing
    const fetchResult = await service.fetchAndStoreRates();
    expect(fetchResult).toContain("Successful API call"); // Check if the fetch result contains "Successful API call"

    // Step 3: Retrieve data from the database and verify the stored values
    const { data: dbRates } = await service.getRatesByCurrency(randomCurrency, 1, 10);
    expect(dbRates.length).toBeGreaterThan(0); // Ensure there is at least one record in the database for this currency

    // Verify at least one stored rate matches the API response
    const matchingRate = dbRates.find(
      (rate) =>
        rate.currency === randomCurrency &&
        rate.rate === randomRate &&
        rate.date.getTime() === new Date(lastUpdate * 1000).getTime()
    );
    expect(matchingRate).toBeDefined(); // Check if the matching rate is defined
  });
});
