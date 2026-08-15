import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface AdminLoginDto {
  username: string;
  password: string;
}

@Controller('api/admin')
export class AdminAuthController {
  private readonly adminUsername =
    process.env.ADMIN_USERNAME ?? process.env.NEXT_PUBLIC_ADMIN_USERNAME ?? '';
  private readonly adminPassword =
    process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '';

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body() body: AdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = (body?.username ?? '').trim();
    const password = (body?.password ?? '').trim();

    if (!this.adminUsername || !this.adminPassword) {
      throw new UnauthorizedException(
        'Admin credentials are not configured on the server',
      );
    }

    if (username !== this.adminUsername || password !== this.adminPassword) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    res.cookie('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
      path: '/',
    });

    return {
      success: true,
      authenticated: true,
      message: 'Admin login successful',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin_session', { path: '/' });

    return {
      success: true,
      authenticated: false,
      message: 'Admin logout successful',
    };
  }

  @Get('session')
  getSession(@Req() req: Request) {
    const authenticated = req.cookies?.admin_session === 'authenticated';

    return {
      success: true,
      authenticated,
    };
  }
}
