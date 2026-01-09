import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import UserModel from '../models/user.model';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterInput) => {
    const existingUser = await UserModel.findOne({ email: data.email });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const user = await UserModel.create(data);
    return user;
};

// inside loginUser
export const loginUser = async (data: LoginInput) => {
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        userId: user._id.toString(),
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
        user,
        accessToken,
        refreshToken,
    };
};

