import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApi() {
    return {
      success: true,
      message: 'Hello from NestJS 🚀',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
