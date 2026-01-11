import { Router } from 'express';
import { register, login } from '../../controllers/auth.controller';
import passport from 'passport';
import { activityLogger } from '../../middleware/activity.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', activityLogger('REGISTER'), register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 */
router.post('/login', activityLogger('LOGIN'), login);

/**
 * @swagger
 * /api/v1/auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth Login
 */
router.get(
  '/google',
  activityLogger('GOOGLE_LOGIN'),
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth Callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`
    );
  }
);

/**
 * @swagger
 * /api/v1/auth/facebook:
 *   get:
 *     tags: [Auth]
 *     summary: Facebook OAuth Login
 */
router.get(
  '/facebook',
  activityLogger('FACEBOOK_LOGIN'),
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

/**
 * @swagger
 * /api/v1/auth/facebook/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Facebook OAuth Callback
 */
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req: any, res) => {
    res.redirect(
      `${process.env.CLIENT_URL}/oauth-success?token=${req.user.token}`
    );
  }
);

export default router;
