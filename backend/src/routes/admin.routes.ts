import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

const router = Router();

router.get(
    '/dashboard',
    authenticate,
    authorizeRoles('ADMIN'),
    (_req, res) => {
        res.json({
            success: true,
            message: 'Admin dashboard access granted',
        });
    }
);

export default router;
