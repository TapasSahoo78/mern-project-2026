import { JwtPayload } from '../jwt.types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role?: string;
      } | JwtPayload;
    }
  }
}

export {};
