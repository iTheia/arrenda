import { Injectable } from '@nestjs/common';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';

@Injectable()
export class CharacterService {
  create(dto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return `This action returns all character`;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  update(id: number, dto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
