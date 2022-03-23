import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly config: ConfigService) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: config.get('auth').accessToken.publicKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(_: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('Error al validar la sesion');
    }
    return payload;
  }
}
