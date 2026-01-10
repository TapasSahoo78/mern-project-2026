import { Request, Response } from 'express';
import {
    getDashboardStats, adminDeletePost,
    adminDeleteComment
} from '../services/admin.service';
import {
    getAllUsers,
    updateUserRole,
    deleteUser,
} from '../services/admin.service';

export const getDashboardHandler = async (_req: Request, res: Response) => {
    try {
        const stats = await getDashboardStats();

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUsersHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUserRoleHandler = async (req: Request, res: Response) => {
    try {
        const user = await updateUserRole(req.params.userId, req.body.role);

        res.status(200).json({
            success: true,
            message: 'User role updated',
            data: user,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        await deleteUser(req.params.userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePostByAdminHandler = async (
    req: Request,
    res: Response
) => {
    try {
        await adminDeletePost(req.params.postId);

        res.status(200).json({
            success: true,
            message: 'Post deleted by admin',
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCommentByAdminHandler = async (
    req: Request,
    res: Response
) => {
    try {
        await adminDeleteComment(req.params.commentId);

        res.status(200).json({
            success: true,
            message: 'Comment deleted by admin',
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
