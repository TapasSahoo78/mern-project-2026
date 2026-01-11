import { Response, NextFunction } from 'express';
import { AuthRequest } from '../@types/auth-request';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '../../logs/activity.log');

export const activityLogger = (action: string) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (req.auth) {
      const log = `[${new Date().toISOString()}] User: ${req.auth.userId
        } | Action: ${action} | IP: ${req.ip}\n`;

      fs.appendFile(logFilePath, log, (err) => {
        if (err) {
          console.error('Failed to write log', err);
        }
      });
    }

    next();
  };
};
