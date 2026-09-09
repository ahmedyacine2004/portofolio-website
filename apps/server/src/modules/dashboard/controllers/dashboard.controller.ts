import {
  Controller,
  Get,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { DashboardActivityQueryDto } from '../dto/dashboard.dto';
import { DashboardService } from '../services/dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  private isAdminSession(req: Request): boolean {
    return req.cookies?.admin_session === 'authenticated';
  }

  @Get('summary')
  getSummary(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getSummary(),
      message: 'Dashboard summary retrieved successfully',
    };
  }

  @Get('activity')
  getActivity(@Req() req: Request, @Query() query: DashboardActivityQueryDto) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getActivity(query.category, query.limit),
      message: 'Dashboard activities retrieved successfully',
    };
  }

  @Get('stats')
  getStats(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getStats(),
      message: 'Dashboard statistics retrieved successfully',
    };
  }

  @Get('goals')
  getGoals(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getGoals(),
      message: 'Dashboard goals retrieved successfully',
    };
  }

  @Get('health')
  getHealth(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getHealth(),
      message: 'System health retrieved successfully',
    };
  }

  @Get('analytics')
  getAnalytics(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getAnalytics(),
      message: 'Analytics summary retrieved successfully',
    };
  }

  @Get('visitors')
  getVisitors(@Req() req: Request, @Query('limit') limit?: number) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getVisitorLogs(limit ?? 50),
      message: 'Visitor logs retrieved successfully',
    };
  }

  @Get('requests')
  getRequests(@Req() req: Request, @Query('limit') limit?: number) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getRequestLogs(limit ?? 100),
      message: 'Request logs retrieved successfully',
    };
  }

  @Get('sessions')
  getSessions(@Req() req: Request) {
    if (!this.isAdminSession(req)) {
      throw new UnauthorizedException('Admin authentication required');
    }

    return {
      success: true,
      data: this.dashboardService.getSessionStats(),
      message: 'Session stats retrieved successfully',
    };
  }
}
