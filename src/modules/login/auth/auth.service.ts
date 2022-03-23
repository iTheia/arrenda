import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { Login } from '../entities';
import { IAccessTokenUser, IRefreshTokenUser } from '../types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login) private loginRepo: Repository<Login>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async validateLogin(username: string, password: string) {
    const login = await this.loginRepo.findOne({
      where: [{ email: username }, { phone: username }],
    });
    if (!login) {
      throw new Error('Usuario y/o contrasena incorrectos');
    }
    login.verifyPassword(password);
    delete login.password;
    return login;
  }
  getJwtAccessToken(payload: IAccessTokenUser) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('auth').accessToken.privateKey,
      expiresIn: '5m',
      algorithm: 'RS256',
    });
    return token;
  }

  getJwtRefreshToken(payload: IRefreshTokenUser) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('auth').refreshToken.privateKey,
      expiresIn: '1h',
      algorithm: 'RS256',
    });
    return token;
  }

  getTokenPair({ email, id, phone, role }: UserDto, res: Response) {
    const refreshToken = this.getJwtRefreshToken({
      id,
      role,
    });
    const accessToken = this.getJwtAccessToken({
      user: email ? email : phone,
      role,
    });
    res.cookie('x-refresh-token', refreshToken, {
      httpOnly: true,
    });
    return { accessToken, refreshToken };
  }
}
