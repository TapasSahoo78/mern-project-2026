import { Request, Response } from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    softDeletePost,
} from '../services/post.service';
import { AuthRequest } from '../@types/auth-request';

export const createPostHandler = async (req: AuthRequest, res: Response) => {
    try {
        const post = await createPost({
            title: req.body.title,
            content: req.body.content,
            author: req?.user!.userId as any,
        });

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPostsHandler = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const posts = await getAllPosts(page, limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            data: posts,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPostHandler = async (req: AuthRequest, res: Response) => {
    try {
        const post = await getPostById(req.params.id);

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updatePostHandler = async (req: AuthRequest, res: Response) => {
    try {
        const post = await updatePost(
            req.params.id,
            req.user!.userId,
            req.user!.role as any,
            req.body
        );

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: post,
        });
    } catch (error: any) {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePostHandler = async (req: AuthRequest, res: Response) => {
    try {
        await softDeletePost(
            req.params.id,
            req.user!.userId,
            req.user!.role as any
        );

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error: any) {
        res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};
