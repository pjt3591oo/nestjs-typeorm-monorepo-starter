import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { TransferHistory } from '../entities/transfer-history.entity';
import { NotificationHistory } from '../entities/notification-history.entity';
import { EnvKey } from '../common/env.validate';

const dataSource = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.get<string>(EnvKey.DB_HOST),
      port: config.get<number>(EnvKey.DB_PORT),
      username: config.get<string>(EnvKey.DB_USERNAME),
      password: config.get<string>(EnvKey.DB_PASSWORD),
      database: config.get<string>(EnvKey.DB_DATABASE),
      entities: [User, TransferHistory, NotificationHistory],
      synchronize: false,
      logging: true,
    });

    return dataSource.initialize();
  },
};

export default dataSource;
