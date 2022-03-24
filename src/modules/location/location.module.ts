import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@modules/files/entities';
import { Location } from './entities';
import { LocationFile } from './entities/location-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Location, LocationFile])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
