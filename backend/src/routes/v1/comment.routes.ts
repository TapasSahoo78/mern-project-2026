import { Router } from 'express';
import {
    createCommentHandler,
    getCommentsHandler,
    updateCommentHandler,
    deleteCommentHandler,
} from '../../controllers/comment.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import {
    createCommentSchema,
    updateCommentSchema,
} from '../../validations/comment.validation';

const router = Router();

// Public
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment APIs
 */

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments by post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *     responses:
 *       200:
 *         description: Comments list
 */

router.get('/:postId', getCommentsHandler);

// Protected
/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     tags: [Comments]
 *     summary: Add comment
 *     security: [bearerAuth: []]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 */
router.post('/:postId', authenticate, validate(createCommentSchema), createCommentHandler);

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     tags: [Comments]
 *     summary: Update comment
 *     security: [bearerAuth: []]
 */
router.put('/:commentId', authenticate, validate(updateCommentSchema), updateCommentHandler);
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete comment
 *     security: [bearerAuth: []]
 */
router.delete('/:commentId', authenticate, deleteCommentHandler);

export default router;
