import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './common/env.validate';
import { Interceptor, MyServiceExceptionFilter } from '@app/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  const configService = app.get(ConfigService);
  const port = configService.get(EnvKey.SERVER_PORT);

  app.useGlobalInterceptors(new Interceptor());
  app.useGlobalFilters(new MyServiceExceptionFilter());

  await app.listen(port);
}
bootstrap();
