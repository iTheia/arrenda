import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Body,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@middlewares/decoratos/auth.decorator';
import { Role } from '@modules/login/types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFileDto } from './dto/create-file.dto';
import { ErrorResponseDto } from '@const/dto';

@Controller('files')
@ApiTags('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth(Role.admin)
  @Post('upload')
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() dto: CreateFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.create(file);
  }

  @Auth(Role.sysAdmin)
  @Delete(':id')
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  async delteFile(@Param('id') id: string) {
    return await this.filesService.deleteOne(+id);
  }

  @Auth(Role.admin)
  @Get()
  @ApiResponse({ status: 400, type: ErrorResponseDto })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.filesService.findAll({
      limit,
      page,
    });
  }
}
