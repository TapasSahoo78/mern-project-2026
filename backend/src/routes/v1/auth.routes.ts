import { Router } from 'express';
import { register, login } from '../../controllers/auth.controller';
import passport from 'passport';
const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req: any, res) => {
        res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`);
    }
);

router.get('/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    })
);

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    (req: any, res) => {
        res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`);
    }
);

export default router;
