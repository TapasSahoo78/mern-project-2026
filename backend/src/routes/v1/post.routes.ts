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

// Public
router.get('/', getPostsHandler);
router.get('/:id', getPostHandler);

// Protected
router.post('/', authenticate, activityLogger('CREATE_POST'), validate(createPostSchema), createPostHandler);
router.put('/:id', authenticate, activityLogger('DELETE_POST'), validate(updatePostSchema), updatePostHandler);
router.delete('/:id', authenticate, deletePostHandler);

export default router;



