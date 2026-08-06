import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): {
    success: boolean;
    message: string;
    timestamp: string;
  } {
    return {
      success: true,
      message: 'Portfolio API is running 🚀',
      timestamp: new Date().toISOString(),
    };
  }
}
