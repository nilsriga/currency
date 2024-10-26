import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let currencyRateRepository: Repository<CurrencyRate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        HttpService,
        ConfigService,
        {
          provide: getRepositoryToken(CurrencyRate),
          useClass: Repository, // Mock repository
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
          lastUpdate: Math.floor(Date.now() / 1000),
          rates: { USD: 1.23, EUR: 1.12 },
        },
        status: 200,
        statusText: 'OK',
        headers: {}, // Add this line
        config: {
          headers: headers, // Add this line
        },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockApiResponse));
      jest.spyOn(currencyRateRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(currencyRateRepository, 'save').mockImplementation(async (rate) => rate);

      await service.fetchAndStoreRates();

      expect(httpService.get).toHaveBeenCalled();
      expect(currencyRateRepository.findOne).toHaveBeenCalledWith({ where: { currency: 'USD', date: expect.any(Date) } });
      expect(currencyRateRepository.save).toHaveBeenCalledTimes(2); // Once for USD and once for EUR
    });

    it('should log an error if fetching rates fails', async () => {
      jest.spyOn(httpService, 'get').mockImplementation(() => {
        throw new Error('API failure');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await service.fetchAndStoreRates();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching currency rates:', expect.any(Error));
    });
  });

  describe('getRatesByCurrency', () => {
    it('should return paginated currency rates', async () => {
      const mockRates = [
        { id: 1, currency: 'USD', rate: 1.23, date: new Date() },
        { id: 2, currency: 'USD', rate: 1.25, date: new Date() },
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
