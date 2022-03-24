import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Marlon' })
  @IsString()
  name: string;
  @ApiProperty({ example: 23 })
  @IsNumber()
  age: number;
  @ApiProperty({ example: 'Humano' })
  @IsString()
  species: string;
  @ApiProperty({ example: 1, description: 'Planeta origen del personaje' })
  @IsNumber()
  location_id: number;
}
