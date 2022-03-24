import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ description: 'imagen enviada en un formData' })
  file: Express.Multer.File;
}
