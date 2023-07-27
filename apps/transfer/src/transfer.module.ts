import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validate';
import * as path from 'path';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: [
        path.resolve(__dirname, '../../../.env.transfer'),
        path.resolve(__dirname, '../../../.env'),
      ],
    }),
    DatabaseModule,
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
