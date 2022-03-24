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
import {
  ErrorResponseDto,
  GetAllPaginated,
  SuccessResponseDto,
} from '@const/dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOneLocationDto } from './dto/get-one.dto';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @Auth(Role.admin)
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  create(@Body() dto: CreateLocationDto) {
    return this.locationService.create(dto);
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: GetAllPaginated })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.locationService.findAll({
      limit,
      page,
    });
  }

  @Get(':id')
  @Auth()
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: GetOneLocationDto })
  findOne(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    return this.locationService.findOne(+id, res);
  }

  @Patch(':id')
  @Auth(Role.sysAdmin)
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
    return this.locationService.update(+id, dto);
  }

  @Delete(':id')
  @Auth(Role.sysAdmin)
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @ApiResponse({ status: 200, type: SuccessResponseDto })
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
