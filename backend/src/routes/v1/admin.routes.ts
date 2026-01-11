import { Router } from 'express';
const router = Router();

import { getDashboardHandler } from '../../controllers/admin.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { authorizeRoles } from '../../middleware/role.middleware';

import {
    getUsersHandler,
    updateUserRoleHandler,
    deleteUserHandler,
    deletePostByAdminHandler,
    getCommentsHandler,
    deleteCommentByAdminHandler,
} from '../../controllers/admin.controller';

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin APIs
 */

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin statistics
 *     security: [bearerAuth: []]
 */
router.get(
    '/dashboard',
    authenticate,
    authorizeRoles('ADMIN'),
    getDashboardHandler
);
/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users
 *     security: [bearerAuth: []]
 */
router.get(
    '/users',
    authenticate,
    authorizeRoles('ADMIN'),
    getUsersHandler
);
/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     tags: [Admin]
 *     summary: Update user role
 *     security: [bearerAuth: []]
 */

router.put(
    '/users/:userId/role',
    authenticate,
    authorizeRoles('ADMIN'),
    updateUserRoleHandler
);
/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete user
 *     security: [bearerAuth: []]
 */
router.delete(
    '/users/:userId',
    authenticate,
    authorizeRoles('ADMIN'),
    deleteUserHandler
);
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete post
 *     security: [bearerAuth: []]
 */
router.delete(
    '/posts/:postId',
    authenticate,
    authorizeRoles('ADMIN'),
    deletePostByAdminHandler
);
/**
 * @swagger
 * /admin/comments:
 *   get:
 *     tags: [Admin]
 *     summary: Get all comments
 *     security: [bearerAuth: []]
 */
router.get(
    '/comments',
    authenticate,
    authorizeRoles('ADMIN'),
    getCommentsHandler
);
/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     tags: [Admin]
 *     summary: Delete post
 *     security: [bearerAuth: []]
 */
router.delete(
    '/comments/:commentId',
    authenticate,
    authorizeRoles('ADMIN'),
    deleteCommentByAdminHandler
);


export default router;