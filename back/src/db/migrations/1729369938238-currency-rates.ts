// Import necessary interfaces from TypeORM
import { MigrationInterface, QueryRunner } from "typeorm";

// Define the migration class implementing MigrationInterface
export class CurrencyRates1729237554127 implements MigrationInterface {
  
  // Method to run when applying the migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Log a message indicating the migration is running
    console.log("Running migration: 1729237554127-currency-rates");
    
    // Execute a query to create the currency_rates table
    await queryRunner.query(`
      CREATE TABLE currency_rates (
        id INT AUTO_INCREMENT PRIMARY KEY, // Primary key with auto-increment
        date DATETIME NOT NULL, // Date of the currency rate
        currency VARCHAR(3) NOT NULL, // Currency code (e.g., USD, EUR)
        rate DECIMAL(15, 6) NOT NULL // Exchange rate with precision
      )
    `);
  }

  // Method to run when reverting the migration
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Execute a query to drop the currency_rates table
    await queryRunner.query(`DROP TABLE currency_rates`);
  }
}
