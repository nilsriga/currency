import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyRates } from '../entity/Currency.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CurrencyService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(CurrencyRates)
        private readonly currencyRateRepository: Repository<CurrencyRates>
    ) { }

    @Cron('0 0 * * *')
    async handleCron() {
        await this.fetchAndStoreRates();
    }

    async fetchAndStoreRates() {

        const apiKey = this.configService.get<string>('API_KEY');

        try {
            const response = await firstValueFrom(
                this.httpService.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}`)
            );
            const data = response.data;
            const currencyRate = new CurrencyRates();
            currencyRate.date = new Date(data.lastUpdate * 1000); // Convert timestamp to Date
            currencyRate.base = data.base;
            currencyRate.rates = data.rates;
            await this.currencyRateRepository.save(currencyRate);
        } catch (error) {
            console.error('Error fetching currency rates:', error);
        }
    }

    async getRates() {
        return this.currencyRateRepository.find({
            order: { date: 'DESC' },
            take: 10,
        });
    }
}