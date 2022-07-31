import { config } from 'dotenv';
import { config as databaseConfig } from './db.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const loadEnvVariables = async () => {
  config();
};

export const loadDatabaseConfig = (): TypeOrmModuleOptions => {
  return databaseConfig();
};
