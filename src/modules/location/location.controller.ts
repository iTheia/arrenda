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
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { Auth } from '@middlewares/decoratos/auth.decorator';
import { Role } from '@modules/login/types';
import { Response } from 'express';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Auth(Role.admin)
  @Post()
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @Auth()
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.locationService.findAll({
      limit,
      page,
    });
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    return this.locationService.findOne(+id, res);
  }

  @Auth(Role.sysAdmin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.locationService.update(+id, dto);
  }

  @Auth(Role.sysAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
