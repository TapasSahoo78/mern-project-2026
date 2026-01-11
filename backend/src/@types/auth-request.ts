import { Request } from 'express';
import type { IUserDocument } from '../models/user.model';

export interface AuthRequest extends Request {
  auth?: {
    userId: string;
    role?: string;
  };
  currentUser?: IUserDocument;
}
