import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getApi() {
    return {
      success: true,
      message: 'Hello from NestJS 🚀',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
