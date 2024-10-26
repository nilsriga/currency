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
      imports: [HttpModule],
      providers: [
        CurrencyService,
        ConfigService,
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

  describe('fetchAndStoreRates', () => {
    it('should fetch and store new currency rates', async () => {
      const mockApiResponse: AxiosResponse = {
        data: {
          lastUpdate: 1729814400,
          rates: { USD: 1.0825, EUR: 1 },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      };

      const mockCurrencyRate: CurrencyRate = {
        id: 1,
        date: new Date(1729814400 * 1000),
        currency: 'USD',
        rate: 1.0825,
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockApiResponse));
      jest.spyOn(currencyRateRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(currencyRateRepository, 'save').mockImplementation(async () => mockCurrencyRate);

      await service.fetchAndStoreRates();

      expect(httpService.get).toHaveBeenCalled();
      expect(currencyRateRepository.findOne).toHaveBeenCalledWith({
        where: { currency: 'USD', date: new Date(1729814400 * 1000) },
      });
      expect(currencyRateRepository.save).toHaveBeenCalledTimes(2); // Once for USD and once for EUR
    });

    it('should log an error if fetching rates fails', async () => {
      jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new Error('API failure')));
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await service.fetchAndStoreRates();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching currency rates:', expect.any(Error));
    });
  });

  describe('getRatesByCurrency', () => {
    it('should return paginated currency rates', async () => {
      const mockRates: CurrencyRate[] = [
        { id: 1, currency: 'USD', rate: 1.0825, date: new Date(1729814400 * 1000) },
        { id: 2, currency: 'USD', rate: 1.083, date: new Date(1729814400 * 1000) },
      ];

      jest.spyOn(currencyRateRepository, 'findAndCount').mockResolvedValue([mockRates, 2]);

      const result = await service.getRatesByCurrency('USD', 1, 10);

      expect(result).toEqual({
        data: mockRates,
        currentPage: 1,
        totalPages: 1,
      });
      expect(currencyRateRepository.findAndCount).toHaveBeenCalledWith({
        where: { currency: 'USD' },
        order: { date: 'DESC' },
        skip: 0,
        take: 10,
      });
    });
  });
});
