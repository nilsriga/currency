// Import necessary modules for testing from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

// Describe the test suite for CurrencyController
describe('CurrencyController', () => {
  let currencyController: CurrencyController;
  let currencyService: CurrencyService;

  // Before each test, create a testing module and compile it
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController], // Declare the controller to be tested
      providers: [
        {
          provide: CurrencyService, // Provide a mock implementation of CurrencyService
          useValue: {
            // Mock any methods you want to use here
            getRates: jest.fn().mockResolvedValue([]), // Mock the getRates method to return an empty array
          },
        },
      ],
    }).compile();

    // Get instances of CurrencyController and CurrencyService from the testing module
    currencyController = module.get<CurrencyController>(CurrencyController);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  // Define a test case to check if the controller is defined
  it('should be defined', () => {
    expect(currencyController).toBeDefined();
  });
});
