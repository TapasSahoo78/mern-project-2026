import dotenv from 'dotenv';

dotenv.config();

// Validate required envs early
const requiredEnv = [
  'MONGO_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'JWT_ACCESS_EXPIRES_IN',
  'JWT_REFRESH_EXPIRES_IN',
] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET!,
  refreshSecret: process.env.JWT_REFRESH_SECRET!,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as any,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as any,
};
