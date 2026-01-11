import PostModel from '../models/post.model';
import CommentModel from '../models/comment.model';
import { Types } from 'mongoose';
import { getPagination } from '../utils/pagination';

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

export const getAllPosts = async (
    user?: { userId: string; role?: string },
    page = 1,
    limit = 10
) => {
    const { skip } = getPagination(page, limit);
    const filter: any = {
        isDeleted: false,
    };

    // 🔐 ROLE-BASED FILTER
    if (user && user.role === 'USER') {
        filter.author = user.userId;
    }

    return PostModel.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('author', 'name email')
        .sort({ createdAt: -1 });
};

export const getPostById = async (postId: string) => {
    const post = await PostModel.findOne({
        _id: postId,
        isDeleted: false,
    }).populate('author', 'name email role').lean();

    if (!post) {
        throw new Error('Post not found');
    }
    const comments = await CommentModel.find({ post: postId })
        .populate('author', 'name')
        .sort({ createdAt: -1 })
        .lean();

    return {
        ...post,
        comments,
    };
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
