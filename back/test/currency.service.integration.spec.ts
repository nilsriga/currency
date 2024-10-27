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
dotenv.config();

describe('CurrencyService Integration (Real DB and HTTP)', () => {
    let service: CurrencyService;
    let httpService: HttpService;
    let currencyRateRepository: Repository<CurrencyRate>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                HttpModule,
                ConfigModule.forRoot({ isGlobal: true }),
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:', // Use an in-memory database
                    entities: [CurrencyRate],
                    synchronize: true,
                    logging: false,
                }),
                TypeOrmModule.forFeature([CurrencyRate]),
            ],
            providers: [CurrencyService, ConfigService],
        }).compile();

        service = module.get<CurrencyService>(CurrencyService);
        httpService = module.get<HttpService>(HttpService);
        currencyRateRepository = module.get<Repository<CurrencyRate>>(getRepositoryToken(CurrencyRate));
    });

    afterAll(async () => {
        await currencyRateRepository.clear(); // Clean up after tests
    });

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    it('should fetch and store rates and validate data retrieval from the database', async () => {
        const apiKey = process.env.ANYAPI_KEY;
        
        // Step 1: Perform the HTTP call to the actual API
        const response = await lastValueFrom(httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`));
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('rates');

        const data = response.data;
        const randomCurrency = Object.keys(data.rates)[Math.floor(Math.random() * Object.keys(data.rates).length)];
        const randomRate = data.rates[randomCurrency];
        const lastUpdate = data.lastUpdate;

        // Step 2: Store the data in the database via the service
        await delay(1000); // Optional delay to mimic real-world timing
        const fetchResult = await service.fetchAndStoreRates();
        expect(fetchResult).toContain("Successful API call");

        // Step 3: Retrieve data from the database and verify the stored values
        const { data: dbRates } = await service.getRatesByCurrency(randomCurrency, 1, 10);

        // Ensure there is at least one record in the database for this currency
        expect(dbRates.length).toBeGreaterThan(0);

        // Verify at least one stored rate matches the API response
        const matchingRate = dbRates.find(
            (rate) =>
                rate.currency === randomCurrency &&
                rate.rate === randomRate &&
                rate.date.getTime() === new Date(lastUpdate * 1000).getTime()
        );
        expect(matchingRate).toBeDefined();
    });
});
