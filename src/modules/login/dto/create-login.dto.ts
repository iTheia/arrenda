import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty({ example: 'super-secret' })
  @IsString()
  password: string;
  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '+52 6182751570' })
  @IsString()
  phone: string;
}
