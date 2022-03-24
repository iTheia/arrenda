import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto {
  @ApiProperty({ example: 'Marlon' })
  name: string;
  @ApiProperty({ example: 23 })
  age: number;
  @ApiProperty({ example: 'Humano' })
  species: string;
  @ApiProperty({ example: 1, description: 'Planeta origen del personaje' })
  location_id: number;
}
