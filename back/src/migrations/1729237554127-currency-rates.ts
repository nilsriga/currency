import { MigrationInterface, QueryRunner } from "typeorm";

export class CurrencyRates1729237554127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TABLE currency_rate (
              id INT AUTO_INCREMENT PRIMARY KEY,
              date DATETIME NOT NULL,
              base VARCHAR(3) NOT NULL,
              rates JSON NOT NULL
            )
          `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DROP TABLE currency_rate`);

    }

}
