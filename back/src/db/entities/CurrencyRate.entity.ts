import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("currency_rates")
export class CurrencyRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ length: 3 })
  currency: string;

  @Column('decimal', { precision: 15, scale: 6 })
  rate: number;
}