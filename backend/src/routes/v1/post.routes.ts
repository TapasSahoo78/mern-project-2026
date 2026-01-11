import { Router } from 'express';
import {
    createPostHandler,
    getPostsHandler,
    getPostHandler,
    updatePostHandler,
    deletePostHandler,
} from '../../controllers/post.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { validate } from '../../middleware/validate.middleware';
import { activityLogger } from '../../middleware/activity.middleware';
import {
    createPostSchema,
    updatePostSchema,
} from '../../validations/post.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post APIs
 */

// Public
/**
 * @swagger
 * /posts:
 *   get:
 *     tags: [Posts]
 *     summary: Get posts (public / role-based)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts list
 */
router.get('/', (req, res, next) => {
  req.headers.authorization ? authenticate(req, res, next) : next();
}, getPostsHandler);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Get single post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Post details
 */
router.get('/:id', getPostHandler);

// Protected
/**
 * @swagger
 * /posts:
 *   post:
 *     tags: [Posts]
 *     summary: Create post
 *     security: [bearerAuth: []]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 */
router.post('/', authenticate, activityLogger('CREATE_POST'), validate(createPostSchema), createPostHandler);
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update post
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Post updated
 */
router.put('/:id', authenticate, activityLogger('DELETE_POST'), validate(updatePostSchema), updatePostHandler);
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete post
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Post deleted
 */
router.delete('/:id', authenticate, deletePostHandler);

export default router;



