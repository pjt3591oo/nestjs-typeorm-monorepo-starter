import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';

export enum EnvKey {
  SERVER_PORT = 'SERVER_PORT',
}

class EnvironmentVariables {
  @IsNumber()
  SERVER_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
