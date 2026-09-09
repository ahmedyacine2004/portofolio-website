import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { DashboardService } from '../../modules/dashboard/services/dashboard.service';

@Injectable()
export class TelemetryMiddleware implements NestMiddleware {
  constructor(private readonly dashboardService: DashboardService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    // Skip tracking dashboard API itself to avoid self-referential noise
    if (req.path.startsWith('/api/dashboard')) {
      next();
      return;
    }

    const startMs = Date.now();

    res.on('finish', () => {
      const latencyMs = Date.now() - startMs;

      // Resolve real IP — respect X-Forwarded-For when behind a proxy
      const forwarded = req.headers['x-forwarded-for'];
      const rawIp =
        (Array.isArray(forwarded)
          ? forwarded[0]
          : forwarded?.split(',')[0]?.trim()) ??
        req.socket.remoteAddress ??
        '0.0.0.0';

      const referrer =
        (req.headers['referer'] as string | undefined) ??
        (req.headers['referrer'] as string | undefined) ??
        '';

      this.dashboardService.trackRequest({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        latencyMs,
        ip: rawIp,
        userAgent: req.headers['user-agent'] ?? '',
        referrer,
      });
    });

    next();
  }
}
