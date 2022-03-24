import {
  ErrorResponseDto,
  GetAllPaginated,
  SuccessResponseDto,
} from '@const/dto';
import { Auth } from '@middlewares/decoratos/auth.decorator';
import { GetOneLocationDto } from '@modules/location/dto/get-one.dto';
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dto';

@Controller('character')
@ApiTags('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Auth(Role.admin)
  @Post()
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 400, type: SuccessResponseDto })
  async create(@Body() dto: CreateCharacterDto) {
    return await this.characterService.create(dto);
  }

  @Auth()
  @Get()
  @ApiResponse({ status: 200, type: GetAllPaginated })
  @ApiResponse({ status: 400, type: ErrorResponseDto })
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
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: GetOneLocationDto })
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.characterService.findOne(+id, res);
  }

  @Patch(':id')
  @Auth(Role.sysAdmin)
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 400, type: SuccessResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
    return this.characterService.update(+id, dto);
  }

  @Auth(Role.sysAdmin)
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }
}
