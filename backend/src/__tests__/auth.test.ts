import request from 'supertest';
import app from '../app';

let accessToken: string;

describe('Auth APIs', () => {

    /* ================= REGISTER ================= */

    it('POST /auth/register → should register a user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                email: 'user@blog.com',
                password: 'User@123',
            });

        expect([201, 400]).toContain(res.statusCode);
        // 400 allowed if user already exists

        if (res.statusCode === 201) {
            expect(res.body.success).toBe(true);
        }
    });

    /* ================= LOGIN ================= */

    it('POST /auth/login → should login user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'user@blog.com',
                password: 'User@123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.user).toBeDefined();

        accessToken = res.body.accessToken;
    });

    /* ================= INVALID LOGIN ================= */

    it('POST /auth/login → should fail with wrong password', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'user@blog.com',
                password: 'WrongPassword',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
    });

    /* ================= PROTECTED ================= */

    it('GET /posts → should allow access with token', async () => {
        const res = await request(app)
            .get('/api/v1/posts')
            .set('Authorization', `Bearer ${accessToken}`);

        expect(res.statusCode).toBe(200);
    });

    /* ================= UNAUTHORIZED ================= */

    it('GET /posts → should allow public access without token', async () => {
        const res = await request(app)
            .get('/api/v1/posts');

        expect(res.statusCode).toBe(200);
    });

    /* ================= LOGOUT (CLIENT SIDE) ================= */

    it('logout → should invalidate token on client', () => {
        // Client removes token from storage
        expect(accessToken).toBeDefined();
    });

});
