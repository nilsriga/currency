import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { CurrencyService } from './currency/currency.service';

async function bootstrap() {
  // const app = await NestFactory.createApplicationContext(AppModule);
  // const currencyService = app.get(CurrencyService);
  // await currencyService.fetchAndStoreRates();
  // await app.close();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
