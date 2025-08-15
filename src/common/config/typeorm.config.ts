import { GetEnvironmentVariables } from './env.validations';
import { DataSource } from 'typeorm';

export const getTypeormConfig = () => {
  const env = GetEnvironmentVariables();
  return new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/../../migrations/**'],
    migrationsTableName: 'migrations',
  });
};