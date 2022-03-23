import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class RefreshAuthGuard extends AuthGuard('refresh') {}

@Injectable()
export class AccessAuthGuard extends AuthGuard('access') {}
