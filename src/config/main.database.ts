import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export default registerAs(
  'database-main',
  (): TypeOrmModuleOptions => ({
    port: parseInt(env.DB_PORT),
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_DATABASE,
    synchronize: env.NODE_ENV === 'develop',
    type: 'postgres',
    ssl: false,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/db/migration/*.ts'],
    cli: {
      migrationsDir: 'src/db/migration',
    },
  }),
);
