import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async create(@Body() dto: CreateLoginDto) {
    return this.loginService.create(dto);
  }

  @Post('register')
  async register(@Body() dto: CreateLoginDto) {
    return this.loginService.create(dto);
  }
}
