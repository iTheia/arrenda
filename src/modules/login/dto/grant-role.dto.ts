import { roles } from '../types';

export class GrantRoleDto {
  userId: number;
  role: roles;
}
