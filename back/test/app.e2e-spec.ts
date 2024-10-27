// Import necessary modules for testing from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpModule } from '@nestjs/axios';

// Describe the test suite for AppController end-to-end tests
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // Before all tests, create a testing module and compile it
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule], // Import AppModule and HttpModule
    }).compile();

    // Create a Nest application instance
    app = moduleFixture.createNestApplication();
    await app.init(); // Initialize the application
  });

  // Define a test case for the root endpoint
  it('/ (GET)', () => {
    return request(app.getHttpServer()) // Make a GET request to the root endpoint
      .get('/')
      .expect(200) // Expect the response status to be 200 (OK)
      .expect("Available endpoints: \n - GET 'currency/usd?page=1&limit=10'"); // Expect the response body to match the string
  });

  // Define a test case for the /currency/usd endpoint with query parameters
  it('/currency/usd?page=1&limit=1 (GET)', () => {
    return request(app.getHttpServer()) // Make a GET request to the /currency/usd endpoint with query parameters
      .get('/currency/usd?page=1&limit=1')
      .expect(200) // Expect the response status to be 200 (OK)
      .expect((res) => {
        expect(res.body).toHaveProperty('data'); // Expect the response body to have a 'data' property
      });
  });

  // After all tests, close the Nest application
  afterAll(async () => {
    await app.close(); // Close the application
  });
});
