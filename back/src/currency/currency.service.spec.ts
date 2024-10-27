import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { of, throwError } from 'rxjs';


describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let currencyRateRepository: Repository<CurrencyRate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-api-key'),
          },
        },
        {
          provide: getRepositoryToken(CurrencyRate),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    currencyRateRepository = module.get<Repository<CurrencyRate>>(getRepositoryToken(CurrencyRate));
  });

  it('should fetch and store rates', async () => {
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

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockApiResponse));
    jest.spyOn(currencyRateRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(currencyRateRepository, 'save').mockResolvedValue(null);

    await service.fetchAndStoreRates();

    expect(httpService.get).toHaveBeenCalledWith(`https://anyapi.io/api/v1/exchange/rates?apiKey=test-api-key`);
    expect(currencyRateRepository.save).toHaveBeenCalledTimes(2);
    expect(currencyRateRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      currency: 'USD',
      rate: 1.0,
    }));
    expect(currencyRateRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      currency: 'EUR',
      rate: 0.85,
    }));
  });

  it('should get rates by currency', async () => {
    const mockRates: CurrencyRate[] = [
      { id: 1, date: new Date(), currency: 'USD', rate: 1.0 },
      { id: 2, date: new Date(), currency: 'USD', rate: 1.1 },
    ];

    jest.spyOn(currencyRateRepository, 'findAndCount').mockResolvedValue([mockRates, mockRates.length]);

    const result = await service.getRatesByCurrency('USD', 1, 10);

    expect(result.data).toEqual(mockRates);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(1);
  });
});