import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Available endpoints:
    - GET '/currency'`;
  }
}
