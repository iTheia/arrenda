import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  cords: {
    x: number;
    y: number;
  };
  @ApiProperty()
  sector: string;
  @ApiProperty()
  images?: number[];
}
