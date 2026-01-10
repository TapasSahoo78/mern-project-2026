import 'module-alias/register';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/user.model';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const existingAdmin = await User.findOne({ email: 'admin@blog.com' });

        if (!existingAdmin) {
            await User.create({
                name: 'admin',
                email: 'admin@blog.com',
                password: 'Admin@123',
                role: 'ADMIN',
                isActive: true,
            });
        }

        const existingUser = await User.findOne({ email: 'user@blog.com' });

        if (!existingUser) {
            await User.create({
                name: 'testuser',
                email: 'user@blog.com',
                password: 'User@123',
                role: 'USER',
                isActive: true,
            });
        }

        console.log('Users seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
