import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../@types/auth-request';

export const activityLogger = (
  action: string
) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (req.auth) {
      console.log(
        `User ${req.auth.userId} performed action: ${action}`
      );
    }
    next();
  };
};
