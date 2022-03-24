import { ApiProperty } from '@nestjs/swagger';

export class GetOneFileDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  path: string;
  @ApiProperty()
  destination: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
