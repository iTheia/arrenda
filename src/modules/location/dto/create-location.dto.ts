import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
class Cords {
  @ApiProperty()
  @IsNumber()
  x: number;
  @ApiProperty()
  @IsNumber()
  y: number;
}
export class CreateLocationDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  cords: Cords;
  @ApiProperty()
  @IsString()
  sector: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { each: true })
  images?: number[];
}
