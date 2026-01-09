export type UserRole = 'ADMIN' | 'USER';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}