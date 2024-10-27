// src/app.module.ts

// Import necessary modules from NestJS and other libraries
import { Module } from '@nestjs/common';
import { SentryModule } from '@sentry/nestjs/setup';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyRate } from './db/entities/CurrencyRate.entity'; // Import the CurrencyRate entity

// Define the AppModule using the @Module decorator
@Module({
  imports: [
    // Initialize Sentry for error tracking
    SentryModule.forRoot(),
    // Initialize ConfigModule to manage environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
    }),
    // Initialize TypeORM with asynchronous configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as 'mysql', // Specify the database type
        host: configService.get<string>('DATABASE_HOST'), // Get the database host from environment variables
        port: configService.get<number>('DATABASE_PORT'), // Get the database port from environment variables
        username: configService.get<string>('DATABASE_USERNAME'), // Get the database username from environment variables
        password: configService.get<string>('DATABASE_PASSWORD'), // Get the database password from environment variables
        database: configService.get<string>('DATABASE_NAME'), // Get the database name from environment variables
        entities: [CurrencyRate], // Specify the entities to be used by TypeORM
        synchronize: true, // Automatically synchronize the database schema
        logging: false // Disable logging
      }),
      inject: [ConfigService], // Inject ConfigService to access environment variables
    }),
    // Import the CurrencyModule
    CurrencyModule,
  ],
  controllers: [AppController], // Specify the controllers to be used
  providers: [AppService], // Specify the providers to be used
})
export class AppModule {}
