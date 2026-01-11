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
import { activityLogger } from '../../middleware/activity.middleware';

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

router.get('/:postId',activityLogger('COMMENT'), getCommentsHandler);

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
router.post('/:postId',activityLogger('ADD_COMMENT'), authenticate, validate(createCommentSchema), createCommentHandler);

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     tags: [Comments]
 *     summary: Update comment
 *     security: [bearerAuth: []]
 */
router.put('/:commentId',activityLogger('UPDATE_COMMENT'), authenticate, validate(updateCommentSchema), updateCommentHandler);
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete comment
 *     security: [bearerAuth: []]
 */
router.delete('/:commentId',activityLogger('DELETE_COMMENT'), authenticate, deleteCommentHandler);

export default router;
