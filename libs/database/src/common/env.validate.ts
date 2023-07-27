import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  LOCAL = 'local',
}

export enum EnvKey {
  HOST = 'HOST',
  PORT = 'PORT',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
  DATABASE = 'DATABASE',
}

class EnvironmentVariables {
  @IsString()
  HOST: string;

  @IsNumber()
  PORT: number;

  @IsString()
  USERNAME: string;

  @IsString()
  PASSWORD: string;

  @IsString()
  DATABASE: string;
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
