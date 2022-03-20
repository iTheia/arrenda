import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { validationSchema } from './config';
import { AdditionalModulesModule } from './modules/additional-modules/additional-modules.module';

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
    AdditionalModulesModule,
  ],
})
export class AppModule {}
