import { roles } from '../types';

export class UserDto {
  id: number;
  phone: string | null;
  email: string | null;
  role: roles;
}
