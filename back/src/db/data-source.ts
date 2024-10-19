import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Load .env file
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST', 'localhost'), // Default to 'localhost' if not set
  port: configService.get<number>('DATABASE_PORT', 3306), // Default to 3306 if not set
  username: configService.get<string>('DATABASE_USERNAME', 'root'), // Default username
  password: configService.get<string>('DATABASE_PASSWORD', ''), // Default to an empty password
  database: configService.get<string>('DATABASE_NAME', 'test'), // Default database name
  entities: [`${__dirname}/../**/**/*.entity.{js,ts}'`], // Adjusted path for entities
  migrations: [`${__dirname}/../**/**/*{.ts,.js}`], // Adjusted path for migrations
  synchronize: true, // Use 'true' only in development
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
