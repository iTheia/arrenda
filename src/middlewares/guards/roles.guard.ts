import { ROLES_KEY } from '@middlewares/decoratos/roles.decorator';
import { Role } from '@modules/login/types';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest();
    if (requiredRoles.length === 0) {
      return true;
    }
    if (user.role === 'sysAdmin') return true;
    return requiredRoles.includes(user.role);
  }
}
