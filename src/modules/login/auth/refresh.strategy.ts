import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: config.get('auth').refreshToken.publicKey,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies['x-refresh-token'],
      ]),
    });
  }

  async validate(_: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('Error al validar la sesion');
    }
    return payload;
  }
}
