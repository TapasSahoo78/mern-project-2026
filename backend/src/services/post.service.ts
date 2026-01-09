import PostModel from '../models/post.model';
import { Types } from 'mongoose';

interface CreatePostInput {
    title: string;
    content: string;
    author: Types.ObjectId;
}

export const createPost = async (data: CreatePostInput) => {
    const post = await PostModel.create({
        ...data,
    });

    return post;
};

export const getAllPosts = async () => {
    return PostModel.find({ isDeleted: false })
        .populate('author', 'name email role')
        .sort({ createdAt: -1 });
};

export const getPostById = async (postId: string) => {
    const post = await PostModel.findOne({
        _id: postId,
        isDeleted: false,
    }).populate('author', 'name email role');

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};

export const updatePost = async (
    postId: string,
    userId: string,
    role: string,
    data: { title?: string; content?: string }
) => {
    const post = await PostModel.findById(postId);

    if (!post || post.isDeleted) {
        throw new Error('Post not found');
    }

    if (role !== 'ADMIN' && post.author.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    if (data.title) post.title = data.title;
    if (data.content) post.content = data.content;

    await post.save();
    return post;
};

export const softDeletePost = async (
    postId: string,
    userId: string,
    role: string
) => {
    const post = await PostModel.findById(postId);

    if (!post || post.isDeleted) {
        throw new Error('Post not found');
    }

    if (role !== 'ADMIN' && post.author.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    post.isDeleted = true;
    post.deletedAt = new Date();

    await post.save();
};
