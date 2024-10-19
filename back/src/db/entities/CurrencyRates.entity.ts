import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrencyRates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  base: string;

  @Column('json')
  rates: Record<string, number>;
}
