import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  appConfig,
  databaseConfig,
  jwtConfig,
  validationSchema,
} from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
