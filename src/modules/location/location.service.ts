import { File } from '@modules/files/entities';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { Location } from './entities';
import {
  Pagination,
  IPaginationOptions,
  paginateRaw,
} from 'nestjs-typeorm-paginate';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as fs from 'fs';
import { LocationFile } from './entities/location-file.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(LocationFile)
    private readonly locationFile: Repository<LocationFile>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateLocationDto) {
    const location = await this.locationRepository
      .create({
        cords: dto.cords,
        sector: dto.sector,
        name: dto.name,
      })
      .save();
    const files = await this.fileRepository
      .createQueryBuilder('file')
      .whereInIds(dto.images)
      .getMany();
    for (let index = 0; index < files.length; index++) {
      await this.locationFile
        .create({ location_id: location.id, file_id: files[index].id })
        .save();
    }

    return { success: true };
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Location>> {
    const host = this.config.get('host') + ':' + this.config.get('port');
    const query = this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.pictures', 'pictures')
      .leftJoinAndSelect('pictures.file', 'file')
      .leftJoinAndSelect('location.characters', 'characters');
    return await paginateRaw<Location>(query, {
      ...options,
      route: host + '/api/v1/location',
    });
  }

  async findOne(id: number, res: Response) {
    // return await this.locationFile.find();
    const data = await this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.pictures', 'pictures')
      .leftJoinAndSelect('pictures.file', 'file')
      .leftJoinAndSelect('location.characters', 'characters')
      .where('location.id = :id', { id })
      .getOne();
    if (!data) {
      res.status(HttpStatus.NO_CONTENT);
      return;
    }
    return data;
  }

  async update(id: number, { cords, images, name, sector }: UpdateLocationDto) {
    const location = await this.locationRepository.findOneByOrFail({ id });
    if (images) {
      const files = await this.fileRepository
        .createQueryBuilder('file')
        .whereInIds(images)
        .getMany();

      await this.locationFile.delete({ location_id: location.id });
      for (let index = 0; index < files.length; index++) {
        await this.locationFile
          .create({
            location_id: location.id,
            file_id: files[index].id,
          })
          .save();
      }
    }
    location.cords = cords;
    location.sector = sector;
    location.name = name;
    await location.save();
    return { success: true };
  }

  async remove(id: number) {
    const location = await this.locationFile
      .createQueryBuilder('location')
      .where('location.location_id = :id', { id })
      .getMany();
    for (let index = 0; index < location.length; index++) {
      const item = location[index];
      await this.fileRepository.delete(item.file_id);
      await this.locationRepository.delete(item.location_id);
    }
    return { success: true };
  }
}
