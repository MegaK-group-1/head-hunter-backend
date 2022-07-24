import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: usunac alternatywne wartosci, ma zostac tylko process.env
export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'head_hunters',
  entities: ['dist//**/**.entity{.ts,.js}'],
  bigNumberStrings: false,
  logging: true,
  synchronize: true,
};
