import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            callbackURL: '/api/v1/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error('Facebook email not available'), false);
                }

                let user = await User.findOne({
                    $or: [{ facebookId: profile.id }, { email }],
                });

                if (!user) {
                    user = await User.create({
                        name: `${profile.name?.givenName ?? ''} ${profile.name?.familyName ?? ''}`.trim(),
                        email,
                        facebookId: profile.id,
                        provider: 'facebook',
                        role: 'USER',
                        isActive: true,
                    });
                }

                const token = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.JWT_ACCESS_SECRET!,
                    { expiresIn: '7d' }
                );

                done(null, { token });
            } catch (err) {
                done(err, false);
            }
        }
    )
);
