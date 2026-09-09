import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TelemetryMiddleware } from '../../common/middleware/telemetry.middleware';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TelemetryMiddleware).forRoutes('*');
  }
}
