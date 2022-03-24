import { Auth } from '@middlewares/decoratos/auth.decorator';
import { Role } from '@modules/login/types';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Auth(Role.admin)
  @Post()
  async create(@Body() dto: CreateCharacterDto) {
    return await this.characterService.create(dto);
  }

  @Auth()
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return await this.characterService.findAll({
      limit,
      page,
    });
  }

  @Auth()
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.characterService.findOne(+id, res);
  }

  @Auth(Role.sysAdmin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
    return this.characterService.update(+id, dto);
  }

  @Auth(Role.sysAdmin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
