// src/currency/currency.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { CurrencyService } from './currency.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyRates } from '../db/entities/CurrencyRates.entity';
import { Repository } from 'typeorm';
import { of } from 'rxjs';

describe('CurrencyService', () => {
  let currencyService: CurrencyService;
  let httpService: HttpService;
  let currencyRateRepository: Repository<CurrencyRates>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(of({ data: {} })),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('dummy-api-key'),
          },
        },
        {
          provide: getRepositoryToken(CurrencyRates), // Mock repository token
          useValue: {
            save: jest.fn().mockResolvedValue({}), // Mock the save method
          },
        },
      ],
    }).compile();

    currencyService = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    currencyRateRepository = module.get<Repository<CurrencyRates>>(getRepositoryToken(CurrencyRates));
  });

  it('should fetch and store rates successfully', async () => {
    await currencyService.fetchAndStoreRates();
    expect(httpService.get).toHaveBeenCalled();
    expect(currencyRateRepository.save).toHaveBeenCalled(); // Ensure save was called
  });
});
