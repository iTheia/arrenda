import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities';
import { Location } from '@modules/location/entities';
import { LocationFile } from '@modules/location/entities/location-file.entity';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('upload'),
    }),
    TypeOrmModule.forFeature([File, Location, LocationFile]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
