import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserRole } from '../@types/user.types';

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
            required: true,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            default: 'USER',
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre<IUserDocument>('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.comparePassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
export default UserModel;