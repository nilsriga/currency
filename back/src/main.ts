// Import the instrumentation code, possibly for Sentry
import "./instrument";

// Import necessary modules from NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CurrencyService } from './currency/currency.service';

async function bootstrap() {
  // This commented-out code is for manually fetching new anyapi values
  // const app = await NestFactory.createApplicationContext(AppModule);
  // const currencyService = app.get(CurrencyService);
  // await currencyService.fetchAndStoreRates();
  // await app.close();

  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-Origin Resource Sharing) with specific settings
  app.enableCors({
    origin: process.env.URL ?? "http://localhost:3001", // The frontend URL
    methods: 'GET', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  // Start the application and listen on the specified port (default to 3000)
  await app.listen(process.env.PORT ?? 3000);
}

// Call the bootstrap function to start the application
bootstrap();
