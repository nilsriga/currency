import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyRate } from '../db/entities/CurrencyRate.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CurrencyService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(CurrencyRate)
        private readonly currencyRateRepository: Repository<CurrencyRate>
    ) { }

    @Cron('0 0 * * *')
    async handleCron() {
        await this.fetchAndStoreRates();
    }

    async fetchAndStoreRates() {
        try {
            const apiKey = this.configService.get<string>('API_KEY');
            const response = await firstValueFrom(
                this.httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`)
            );
            const data = response.data;
            const date = new Date(data.lastUpdate * 1000); // Convert timestamp to Date

            const currencyRateEntities = Object.entries(data.rates).map(([currency, rate]) => {
                const currencyRate = new CurrencyRate();
                currencyRate.date = date;
                currencyRate.currency = currency;
                currencyRate.rate = rate as number;
                return currencyRate;
            });

            // Save all the currency rates at once
            await this.currencyRateRepository.save(currencyRateEntities);
        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }
    }

    async getRatesByCurrency(currency: string, page: number = 1, limit: number = 10) {
        const [results, total] = await this.currencyRateRepository.findAndCount({
          where: { currency: currency.toUpperCase() },
          order: { date: 'DESC' },
          skip: (page - 1) * limit,
          take: limit,
        });
    
        return {
          data: results,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        };
      }
}

