import { Router } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import commentRoutes from './comment.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/admin', adminRoutes);

export default router;
