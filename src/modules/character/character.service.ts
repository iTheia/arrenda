import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import {
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';
import { Character } from './entities';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateCharacterDto) {
    await this.characterRepository.create(dto).save();
    return {
      success: true,
    };
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Character>> {
    const host = this.config.get('host') + ':' + this.config.get('port');
    const query = this.characterRepository
      .createQueryBuilder('character')
      .leftJoinAndSelect('character.location', 'location')
      .leftJoinAndSelect('location.pictures', 'pictures')
      .leftJoinAndSelect('pictures.file', 'file');
    return await paginateRaw<Character>(query, {
      ...options,
      route: host + '/api/v1/character',
    });
  }

  async findOne(id: number, res: Response) {
    const data = await this.characterRepository
      .createQueryBuilder('character')
      .leftJoinAndSelect('character.location', 'location')
      .leftJoinAndSelect('location.pictures', 'pictures')
      .leftJoinAndSelect('pictures.file', 'file')
      .where('character.id = :id', { id })
      .getOne();
    if (!data) {
      res.status(HttpStatus.NO_CONTENT);
      return;
    }
    return data;
  }

  async update(id: number, dto: UpdateCharacterDto) {
    const data = await this.characterRepository.findOneByOrFail({ id });
    await this.characterRepository.save({ ...data, ...dto });
    return { success: true };
  }

  async remove(id: number) {
    const data = await this.characterRepository.findOneByOrFail({ id });
    await data.remove();
    return { success: true };
  }
}
