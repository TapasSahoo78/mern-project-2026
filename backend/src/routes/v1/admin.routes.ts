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

router.get(
    '/dashboard',
    authenticate,
    authorizeRoles('ADMIN'),
    getDashboardHandler
);
router.get(
    '/users',
    authenticate,
    authorizeRoles('ADMIN'),
    getUsersHandler
);

router.put(
    '/users/:userId/role',
    authenticate,
    authorizeRoles('ADMIN'),
    updateUserRoleHandler
);

router.delete(
    '/users/:userId',
    authenticate,
    authorizeRoles('ADMIN'),
    deleteUserHandler
);

router.delete(
    '/posts/:postId',
    authenticate,
    authorizeRoles('ADMIN'),
    deletePostByAdminHandler
);

router.get(
    '/comments',
    authenticate,
    authorizeRoles('ADMIN'),
    getCommentsHandler
);

router.delete(
    '/comments/:commentId',
    authenticate,
    authorizeRoles('ADMIN'),
    deleteCommentByAdminHandler
);


export default router;