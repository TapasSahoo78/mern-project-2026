export type UserRole = 'ADMIN' | 'USER';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  provider: string;
  googleId: string;
  facebookId: string;
  refreshTokens: any
}