import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.get('/protected', authenticate, (req, res) => {
  res.json({
    success: true,
    message: 'Protected route accessed',
    user: req
  });
});

export default router;
