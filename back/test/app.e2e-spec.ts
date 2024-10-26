import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(`Available endpoints: \n - GET 'currency/usd?page=1&limit=10'`);
  });
});



describe('Main (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have CORS enabled', async () => {
    const response = await request(app.getHttpServer()).options('/');
    expect(response.headers['access-control-allow-origin']).toBe(process.env.URL);
  });

  it('should start and return a 200 response on GET /', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(200);
  });
});
