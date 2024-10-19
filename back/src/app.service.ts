import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoutes(): string {
    return `Available endpoints: \n - GET '/currency'`;
  }
}
