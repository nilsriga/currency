import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyService } from '../src/currency/currency.service';
import { CurrencyRate } from '../src/db/entities/CurrencyRate.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

describe('CurrencyService Integration', () => {
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
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    currencyRateRepository = module.get<Repository<CurrencyRate>>(getRepositoryToken(CurrencyRate));
  });

  it('should fetch and store rates', async () => {
    const apiKey = process.env.ANYAPI_KEY;
    const response = await firstValueFrom(
      httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`)
    );

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('rates');

    await service.fetchAndStoreRates();

    const savedRates = await currencyRateRepository.find();
    expect(savedRates.length).toBeGreaterThan(0);
  });
});
