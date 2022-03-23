import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import {
  LocalStrategy,
  AuthService,
  AccessStrategy,
  RefreshStrategy,
} from './auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Login } from './entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Login]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    LocalStrategy,
    AuthService,
    RefreshStrategy,
    AccessStrategy,
  ],
})
export class LoginModule {}
