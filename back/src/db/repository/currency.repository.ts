import { EntityRepository, Repository } from 'typeorm';
import { CurrencyRates } from '../entities/CurrencyRates.entity';

@EntityRepository(CurrencyRates)
export class CurrencyRatesRepository extends Repository<CurrencyRates> {}
