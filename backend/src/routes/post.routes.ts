import { Router } from 'express';
import {
    createPostHandler,
    getPostsHandler,
    getPostHandler,
    updatePostHandler,
    deletePostHandler,
} from '../controllers/post.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import {
    createPostSchema,
    updatePostSchema,
} from '../validations/post.validation';

const router = Router();

// Public
router.get('/', getPostsHandler);
router.get('/:id', getPostHandler);

// Protected
router.post('/', authenticate, validate(createPostSchema), createPostHandler);
router.put('/:id', authenticate, validate(updatePostSchema), updatePostHandler);
router.delete('/:id', authenticate, deletePostHandler);

export default router;



