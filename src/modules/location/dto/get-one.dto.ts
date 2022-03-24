import { GetOneCharacterDto } from '@modules/character/dto/get-one.dto';
import { GetOneFileDto } from '@modules/files/dto/get-one.dto';
import { ApiProperty } from '@nestjs/swagger';

class Pictures {
  @ApiProperty()
  id: number;
  @ApiProperty()
  file: GetOneFileDto;
}
export class GetOneLocationDto {
  @ApiProperty()
  id: number;
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
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: Pictures })
  pictures: Pictures[];

  @ApiProperty({ type: Pictures })
  characters: GetOneCharacterDto[];
}
