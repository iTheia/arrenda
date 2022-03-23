import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { AuthService } from './auth';
import { CreateLoginDto, UserDto } from './dto';
import { GrantRoleDto } from './dto/grant-role.dto';
import { Login } from './entities';
import { IRefreshTokenUser } from './types';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private loginRepo: Repository<Login>,
    private readonly authService: AuthService,
  ) {}
  async login(dto: UserDto, res: Response) {
    const { accessToken } = this.authService.getTokenPair(dto, res);
    return { accessToken };
  }

  async register(dto: CreateLoginDto, res: Response) {
    const login = await this.loginRepo.create(dto).save();
    const { accessToken } = this.authService.getTokenPair(login, res);
    return { accessToken };
  }
  async currentSession(user: IRefreshTokenUser, res: Response) {
    const dto = await this.loginRepo.findOne({
      where: { id: user.id },
    });
    const { accessToken } = this.authService.getTokenPair(dto, res);
    return { accessToken };
  }
  async closeSession(res: Response) {
    res.cookie('x-refresh-token', '', {
      httpOnly: true,
    });
    return { accessToken: '' };
  }
  async grantRole(dto: GrantRoleDto) {
    const user = await this.loginRepo.findOneOrFail({
      where: { id: dto.userId },
    });
    if (user.role === 'sysAdmin')
      throw new UnauthorizedException('No se puede realizar esa operacion');
    user.role = dto.role;
    await user.save();
    return {
      success: true,
    };
  }
}
