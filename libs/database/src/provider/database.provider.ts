import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { TransferHistory } from '../entities/transfer-history.entity';
import { NotificationHistory } from '../entities/notification-history.entity';

const dataSource = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.get<string>(`HOST`),
      port: config.get<number>(`PORT`),
      username: config.get<string>(`USERNAME`),
      password: config.get<string>(`PASSWORD`),
      database: config.get<string>(`DATABASE`),
      entities: [User, TransferHistory, NotificationHistory],
      synchronize: false,
      logging: true,
    });

    return dataSource.initialize();
  },
};

export default dataSource;
