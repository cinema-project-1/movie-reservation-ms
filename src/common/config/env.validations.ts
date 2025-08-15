import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import * as process from 'process';

export class EnvironmentVariables {
  // --------
  // APP CONFIG
  @IsNumber()
  APP_PORT: number;

  @IsEnum(['local', 'dev', 'prod'])
  NODE_ENV: 'local' | 'dev' | 'prod';

  // --------
  // DATABASE CONFIG
  @IsString()
  DB_HOST: string;

  @IsInt()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  // --------
  // API CONFIG
  @IsString()
  API_URL: string;
}

let validatedConfig: EnvironmentVariables;

export function validate(config: Record<string, unknown>) {
  validatedConfig = plainToInstance(EnvironmentVariables, config, {
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

export function GetEnvironmentVariables() {
  if (!validatedConfig) {
    validate(process.env);
  }
  return validatedConfig;
}
