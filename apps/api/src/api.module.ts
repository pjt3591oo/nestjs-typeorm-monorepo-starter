import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { User } from '@app/database/entities/user.entity';
import { DataSource } from 'typeorm';
import { validate } from './common/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: [
        path.resolve(__dirname, '../../../.env.api'),
        path.resolve(__dirname, '../../../.env.base'),
      ],
    }),
    DatabaseModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: User,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class ApiModule {}
