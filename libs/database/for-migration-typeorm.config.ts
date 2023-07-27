import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import { validate } from './src/common/env.validate';
config();

const configService = new ConfigService();

const options = {
  HOST: configService.get('HOST'),
  PORT: parseInt(configService.get('PORT') as string),
  USERNAME: configService.get('USERNAME'),
  PASSWORD: configService.get('PASSWORD'),
  DATABASE: configService.get('DATABASE'),
};

validate(options);

export default new DataSource({
  type: 'mysql',
  host: options.HOST,
  port: options.PORT,
  username: options.USERNAME,
  password: options.PASSWORD,
  database: options.DATABASE,
  migrations: [path.resolve(__dirname, 'src/migrations/*{.ts,.js}')],
  entities: [path.resolve(__dirname, 'src/entities/*{.ts,.js}')],
  logging: true,
});
