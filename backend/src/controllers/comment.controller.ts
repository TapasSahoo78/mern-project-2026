import { Request, Response } from 'express';
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from '../services/comment.service';
import { AuthRequest } from '../@types/auth-request';

export const createCommentHandler = async (req: AuthRequest, res: Response) => {
  try {    
    const comment = await createComment({
      content: req.body.content,
      postId: req.params.postId,
      authorId: req.user!.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCommentsHandler = async (req: AuthRequest, res: Response) => {
  try {
    const comments = await getCommentsByPost(req.params.postId);

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCommentHandler = async (req: AuthRequest, res: Response) => {
  try {
    const comment = await updateComment(
      req.params.commentId,
      req.user!.userId,
      req.user!.role as any,
      req.body.content
    );

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCommentHandler = async (req: AuthRequest, res: Response) => {
  try {
    await deleteComment(
      req.params.commentId,
      req.user!.userId,
      req.user!.role as any
    );

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
