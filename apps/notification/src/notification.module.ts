import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';
import { DatabaseModule } from '@app/database';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: [
        path.resolve(__dirname, '../../../.env.notification'),
        path.resolve(__dirname, '../../../.env'),
      ],
    }),
    DatabaseModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
