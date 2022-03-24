import { ApiProperty } from '@nestjs/swagger';
import { roles } from '../types';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 6182751570 })
  phone: string | null;
  @ApiProperty({ example: 'martinez.ded@gmail.com' })
  email: string | null;
  @ApiProperty({ example: 'basic', description: 'rol del usuario' })
  role: roles;
}
