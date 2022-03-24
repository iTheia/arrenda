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
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '@middlewares/decoratos/auth.decorator';
import { Role } from '@modules/login/types';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth(Role.admin)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.create(file);
  }

  @Auth(Role.sysAdmin)
  @Delete(':id')
  async delteFile(@Param('id') id: string) {
    return await this.filesService.deleteOne(+id);
  }

  @Auth(Role.admin)
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.filesService.findAll({
      limit,
      page,
    });
  }
}
