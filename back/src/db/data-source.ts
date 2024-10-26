import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST', 'localhost'), // Default to 'localhost' if not set
  port: configService.get<number>('DATABASE_PORT', 3306), // Default to 3306 if not set
  username: configService.get<string>('DATABASE_USERNAME', 'sammy'), // Default username
  password: configService.get<string>('DATABASE_PASSWORD', 'asdf'), // Default to an empty password
  database: configService.get<string>('DATABASE_NAME', 'currencies'), // Default database name

  entities: [`${__dirname}/../db/entities/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../db/migrations/*.{js,ts}`],  
  synchronize: true, // Use 'true' only in development
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
