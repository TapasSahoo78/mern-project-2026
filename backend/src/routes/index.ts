import { Router } from 'express';
import authRoutes from './auth.routes';
import testRoutes from './test.routes';
import postRoutes from './post.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/test', testRoutes);
router.use('/posts', postRoutes);

export default router;
