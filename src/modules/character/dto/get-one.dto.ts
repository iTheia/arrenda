import { GetOneLocationDto } from '@modules/location/dto/get-one.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneCharacterDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  location_id: number;
  @ApiProperty()
  age: number;
  @ApiProperty()
  species: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  location: GetOneLocationDto;
}
