// Import the DataSource class from TypeORM
import { DataSource } from 'typeorm';
// Import the ConfigService from NestJS config module
import { ConfigService } from '@nestjs/config';

// Create an instance of ConfigService to access environment variables
const configService = new ConfigService();

// Export the AppDataSource constant, which is an instance of DataSource
export const AppDataSource = new DataSource({
  type: 'mysql', // Specify the database type (MySQL in this case)
  host: configService.get<string>('DATABASE_HOST', 'localhost'), // Get the database host from environment variables, default to 'localhost' if not set
  port: configService.get<number>('DATABASE_PORT', 3306), // Get the database port from environment variables, default to 3306 if not set
  username: configService.get<string>('DATABASE_USERNAME', 'sammy'), // Get the database username from environment variables, default to 'sammy' if not set
  password: configService.get<string>('DATABASE_PASSWORD', 'asdf'), // Get the database password from environment variables, default to 'asdf' if not set
  database: configService.get<string>('DATABASE_NAME', 'currencies'), // Get the database name from environment variables, default to 'currencies' if not set
  entities: [`${__dirname}/../db/entities/*.entity.{js,ts}`], // Specify the path to the entity files
  migrations: [`${__dirname}/../db/migrations/*.{js,ts}`], // Specify the path to the migration files
  synchronize: true, // Automatically synchronize the database schema, use 'true' only in development
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    // Log a success message if the data source is initialized successfully
    console.log('Data Source has been initialized successfully!');
  })
  .catch((err) => {
    // Log an error message if there is an error during data source initialization
    console.error('Error during Data Source initialization:', err);
  });
