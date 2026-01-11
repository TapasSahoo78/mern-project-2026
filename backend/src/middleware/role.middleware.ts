import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../@types/user.types';
import { AuthRequest } from '../@types/auth-request';

export const authorizeRoles =
    (...roles: string[]) =>
        (req: Request, res: Response, next: NextFunction): void => {
            const auth = (req as AuthRequest).auth;

            if (!auth || !roles.includes(auth.role!)) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }

            next();
        };

