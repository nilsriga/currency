import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpModule } from '@nestjs/axios';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    console.log(1)
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect("Available endpoints: \n - GET 'currency/usd?page=1&limit=10'");
  });

  it('/currency/usd?page=1&limit=1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/currency/usd?page=1&limit=1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
