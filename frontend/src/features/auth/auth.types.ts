export interface User {
  id: string;
  name?: string;
  email?: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
