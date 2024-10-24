import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(`It should return : "Available endpoints: \n - GET 'currency/usd?page=1&limit=10'"`, () => {
      expect(appController.getRoutes()).toBe(`Available endpoints: \n - GET 'currency/usd?page=1&limit=10'`);
    });
  });
});
