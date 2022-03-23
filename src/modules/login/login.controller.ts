import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, UserDto } from './dto';
import { LocalAuthGuard, RefreshAuthGuard } from '@middlewares/guards';
import { Response } from 'express';
import { Auth } from '@middlewares/decoratos/auth.decorator';
import { Role } from './types';
import { GrantRoleDto } from './dto/grant-role.dto';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async create(
    @Req() { user }: { user: UserDto },
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.loginService.login(user, res);
  }

  @Post('register')
  async register(
    @Body() dto: CreateLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.loginService.register(dto, res);
  }

  @UseGuards(RefreshAuthGuard)
  @Get('current-session')
  async currentSession(@Req() req, @Res({ passthrough: true }) res: Response) {
    return await this.loginService.currentSession(req.user, res);
  }

  @Auth(Role.sysAdmin)
  @Post('grant-role')
  async grantRole(@Body() dto: GrantRoleDto) {
    return await this.loginService.grantRole(dto);
  }

  @Get('close-session')
  async closeSession(@Res({ passthrough: true }) res: Response) {
    return await this.loginService.closeSession(res);
  }
}
