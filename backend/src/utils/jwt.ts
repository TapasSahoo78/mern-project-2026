import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(
        payload,
        jwtConfig.accessSecret as Secret,
        { expiresIn: jwtConfig.accessExpiresIn }
    );
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(
        payload,
        jwtConfig.refreshSecret as Secret,
        { expiresIn: jwtConfig.refreshExpiresIn }
    );
};
