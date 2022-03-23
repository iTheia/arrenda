export type roles = 'sysAdmin' | 'admin' | 'basic';

export enum Role {
  sysAdmin = 'sysAdmin',
  admin = 'admin',
  basic = 'basic',
}
export interface IRefreshTokenUser {
  id: number;
  role: roles;
}

export interface IAccessTokenUser {
  user: string;
  role: roles;
}
