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
router.get('/:postId', getCommentsHandler);

// Protected
router.post('/:postId', authenticate, validate(createCommentSchema), createCommentHandler);
router.put('/:commentId', authenticate, validate(updateCommentSchema), updateCommentHandler);
router.delete('/:commentId', authenticate, deleteCommentHandler);

export default router;
