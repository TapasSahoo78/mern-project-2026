import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../@types/auth-request';

export const activityLogger = (
  action: string
) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (req.user) {
      console.log(
        `User ${req.user.userId} performed action: ${action}`
      );
    }
    next();
  };
};
