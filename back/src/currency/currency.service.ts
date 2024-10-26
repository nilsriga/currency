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

    @Cron('1 3,16 * * *')
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

            // Iterate over the rates and save them individually if they don't exist
            for (const [currency, rate] of Object.entries(data.rates)) {
                // Check if the currency rate for the given date and currency already exists
                const existingRate = await this.currencyRateRepository.findOne({
                    where: { date, currency }
                });

                // If the rate doesn't exist, create a new record
                if (!existingRate) {
                    const currencyRate = new CurrencyRate();
                    currencyRate.date = date;
                    currencyRate.currency = currency;
                    currencyRate.rate = rate as number;
                    await this.currencyRateRepository.save(currencyRate);
                }
            }
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

