import { NestFactory } from '@nestjs/core';
import { TransferModule } from './transfer.module';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './common/env.validate';

async function bootstrap() {
  const app = await NestFactory.create(TransferModule);

  const configService = app.get(ConfigService);
  const port = configService.get(EnvKey.SERVER_PORT);

  await app.listen(port);
}
bootstrap();
