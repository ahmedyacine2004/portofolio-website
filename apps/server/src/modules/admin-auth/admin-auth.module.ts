import { Module } from '@nestjs/common';

import { AdminAuthController } from './controllers/admin-auth.controller';

@Module({
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
