import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import { EnvKey, validate } from './src/common/env.validate';
config();

const configService = new ConfigService();

const options = {
  DB_HOST: configService.get(EnvKey.DB_HOST),
  DB_PORT: parseInt(configService.get(EnvKey.DB_PORT) as string),
  DB_USERNAME: configService.get(EnvKey.DB_USERNAME),
  DB_PASSWORD: configService.get(EnvKey.DB_PASSWORD),
  DB_DATABASE: configService.get(EnvKey.DB_DATABASE),
};

validate(options);

export default new DataSource({
  type: 'mysql',
  host: options.DB_HOST,
  port: options.DB_PORT,
  username: options.DB_USERNAME,
  password: options.DB_PASSWORD,
  database: options.DB_DATABASE,
  migrations: [path.resolve(__dirname, 'src/migrations/*{.ts,.js}')],
  entities: [path.resolve(__dirname, 'src/entities/*{.ts,.js}')],
  logging: true,
});
