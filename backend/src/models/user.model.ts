import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserRole } from '../@types/user.types';
import { any } from 'zod';

export interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: function (this: any): boolean {
                return this.provider === 'local';
            },
        },
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER',
        },
        isActive: {
            type: Boolean,
            default: true
        },
        /* 🔐 AUTH PROVIDER */
        provider: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local',
        },

        /* 🔑 OAUTH IDS */
        googleId: {
            type: String,
            default: null,
        },

        facebookId: {
            type: String,
            default: null,
        },
        refreshTokens: [{
            token: String,
            expires: Date
        }]
    },
    {
        timestamps: true,
    }
);

// UserSchema.index({ email: 1 });

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


UserSchema.methods.comparePassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
export default UserModel;