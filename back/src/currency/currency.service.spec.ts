// Import necessary modules for testing from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of, throwError } from 'rxjs';

// Describe the test suite for CurrencyService
describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let currencyRateRepository: Repository<CurrencyRate>;

  // Before each test, create a testing module and compile it
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService, // Provide the CurrencyService
        {
          provide: HttpService, // Provide a mock implementation of HttpService
          useValue: {
            get: jest.fn(), // Mock the get method
          },
        },
        {
          provide: ConfigService, // Provide a mock implementation of ConfigService
          useValue: {
            get: jest.fn().mockReturnValue('test-api-key'), // Mock the get method to return 'test-api-key'
          },
        },
        {
          provide: getRepositoryToken(CurrencyRate), // Provide the CurrencyRate repository
          useClass: Repository, // Use the Repository class
        },
      ],
    }).compile();

    // Get instances of CurrencyService, HttpService, and CurrencyRate repository from the testing module
    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    currencyRateRepository = module.get<Repository<CurrencyRate>>(getRepositoryToken(CurrencyRate));
  });

  // Define a test case to check if the service can fetch and store rates
  it('should fetch and store rates', async () => {
    // Mock API response
    const mockApiResponse: AxiosResponse = {
      data: {
        lastUpdate: 1633024800,
        rates: {
          USD: 1.0,
          EUR: 0.85,
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    };

    // Mock the get method of HttpService to return the mock API response
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockApiResponse));
    // Mock the findOne method of CurrencyRate repository to return null
    jest.spyOn(currencyRateRepository, 'findOne').mockResolvedValue(null);
    // Mock the save method of CurrencyRate repository to resolve successfully
    jest.spyOn(currencyRateRepository, 'save').mockResolvedValue(null);

    // Call the fetchAndStoreRates method of CurrencyService
    await service.fetchAndStoreRates();

    // Check if the get method of HttpService was called with the correct URL
    expect(httpService.get).toHaveBeenCalledWith(`https://anyapi.io/api/v1/exchange/rates?apiKey=test-api-key`);
    // Check if the save method of CurrencyRate repository was called twice
    expect(currencyRateRepository.save).toHaveBeenCalledTimes(2);
    // Check if the save method of CurrencyRate repository was called with the correct data for USD
    expect(currencyRateRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      currency: 'USD',
      rate: 1.0,
    }));
    // Check if the save method of CurrencyRate repository was called with the correct data for EUR
    expect(currencyRateRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      currency: 'EUR',
      rate: 0.85,
    }));
  });

  // Define a test case to check if the service can get rates by currency
  it('should get rates by currency', async () => {
    // Mock currency rates
    const mockRates: CurrencyRate[] = [
      { id: 1, date: new Date(), currency: 'USD', rate: 1.0 },
      { id: 2, date: new Date(), currency: 'USD', rate: 1.1 },
    ];

    // Mock the findAndCount method of CurrencyRate repository to return the mock rates and their count
    jest.spyOn(currencyRateRepository, 'findAndCount').mockResolvedValue([mockRates, mockRates.length]);

    // Call the getRatesByCurrency method of CurrencyService
    const result = await service.getRatesByCurrency('USD', 1, 10);

    // Check if the result data matches the mock rates
    expect(result.data).toEqual(mockRates);
    // Check if the current page is 1
    expect(result.currentPage).toBe(1);
    // Check if the total pages is 1
    expect(result.totalPages).toBe(1);
  });
});
