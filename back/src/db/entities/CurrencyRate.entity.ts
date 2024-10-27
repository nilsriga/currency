// Import necessary decorators from TypeORM
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Use the Entity decorator to define a database table named "currency_rates"
@Entity("currency_rates")
export class CurrencyRate {
  // Define the primary key column with auto-increment
  @PrimaryGeneratedColumn()
  id: number;

  // Define a column for the date of the currency rate
  @Column()
  date: Date;

  // Define a column for the currency code with a maximum length of 3 characters
  @Column({ length: 3 })
  currency: string;

  // Define a column for the exchange rate with precision and scale
  @Column('decimal', { precision: 15, scale: 6 })
  rate: number;
}
