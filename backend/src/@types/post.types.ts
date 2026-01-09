import { Types } from 'mongoose';

export interface IPost {
    title: string;
    content: string;
    author: Types.ObjectId;
    slug: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
}
