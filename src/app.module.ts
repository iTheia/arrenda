import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { validationSchema } from './config';
import { AdditionalModulesModule } from './modules/additional-modules/additional-modules.module';
import { CharacterModule } from './modules/character/character.module';
import { LocationModule } from './modules/location/location.module';
import { FilesModule } from './modules/files/files.module';
import { LoginModule } from './modules/login/login.module';

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
    CharacterModule,
    LocationModule,
    FilesModule,
    LoginModule,
  ],
})
export class AppModule {}
