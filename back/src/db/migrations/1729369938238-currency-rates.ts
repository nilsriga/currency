import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyRates1729237554127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        console.log("Running migration: 1729237554127-currency-rates");

        await queryRunner.query(`
            CREATE TABLE currency_rates (
              id INT AUTO_INCREMENT PRIMARY KEY,
              date DATETIME NOT NULL,
              currency VARCHAR(3) NOT NULL,
              rate DECIMAL(15, 6) NOT NULL
            )
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE currency_rate`);

    }

}
