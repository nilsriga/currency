// Import necessary modules for testing from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Describe the test suite for AppController
describe('AppController', () => {
  let appController: AppController;

  // Before each test, create a testing module and compile it
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Declare the controller to be tested
      providers: [AppService], // Declare the service to be used
    }).compile();

    // Get an instance of AppController from the testing module
    appController = app.get<AppController>(AppController);
  });

  // Describe the test case for the root endpoint
  describe('root', () => {
    // Define the test case
    it(`It should return : "Available endpoints: \n - GET 'currency/usd?page=1&limit=10'"`, () => {
      // Expect the getRoutes method to return the specified string
      expect(appController.getRoutes()).toBe(`Available endpoints: \n - GET 'currency/usd?page=1&limit=10'`);
    });
  });
});
