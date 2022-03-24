import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities';
import * as fs from 'fs';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: Express.Multer.File) {
    const host = this.config.get('host') + ':' + this.config.get('port');
    const path = host + '/images/' + dto.filename;
    const file = await this.fileRepository
      .create({
        name: dto.filename,
        path,
        type: dto.mimetype,
        size: dto.size,
        destination: dto.destination,
      })
      .save();
    return { id: file.id, path };
  }
  async findAll(options: IPaginationOptions): Promise<Pagination<File>> {
    const host = this.config.get('host') + ':' + this.config.get('port');
    return await paginate<File>(this.fileRepository, {
      ...options,
      route: host + '/api/v1/location',
    });
  }
  async deleteOne(id: number) {
    const file = await this.fileRepository.findOneByOrFail({ id });
    fs.unlinkSync(`./static/images/${file.name}`);
    await file.remove();
    return { success: true };
  }
}
