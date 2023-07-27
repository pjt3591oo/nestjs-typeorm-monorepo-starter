import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './common/env.validate';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const configService = app.get(ConfigService);
  const port = configService.get(EnvKey.SERVER_PORT);

  await app.listen(port);
}
bootstrap();
