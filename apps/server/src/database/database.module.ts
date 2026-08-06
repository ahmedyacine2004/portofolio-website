import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri'),

        onConnectionCreate: (connection) => {
          console.log('🍃 MongoDB connected successfully');
          return connection;
        },
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
