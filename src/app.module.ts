import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { validationSchema } from './config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database-main'),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: config,
      isGlobal: true,
      validationSchema,
    }),
  ],
})
export class AppModule {}
