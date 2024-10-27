import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
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

    @Cron('1 3,16 * * *')
    async handleCron() {
        await this.fetchAndStoreRates();
    }

    async fetchAndStoreRates(): Promise<string> {
        try {
            const apiKey = this.configService.get<string>('ANYAPI_KEY');
            const response = await lastValueFrom(
                this.httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`)
            );
            const data = response.data;
            const date = new Date(data.lastUpdate * 1000); // Convert timestamp to Date

            let saved = false;
            for (const [currency, rate] of Object.entries(data.rates)) {
                
                const existingRate = await this.currencyRateRepository.findOne({
                    where: { date, currency }
                });

                if (!existingRate) {
                    const currencyRate = new CurrencyRate();
                    currencyRate.date = date;
                    currencyRate.currency = currency;
                    currencyRate.rate = rate as number;
                    await this.currencyRateRepository.save(currencyRate);
                    saved = true;
                }
            }
            return saved ? "Successful API call and successful saving of rates" : "Successful API call, Nothing to save";
        } catch (error) {
            console.error('Error fetching currency rates:', error);
            throw error;
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
