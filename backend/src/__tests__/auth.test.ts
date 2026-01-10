import request from 'supertest';
import app from '../app';

describe('Auth APIs', () => {
    it('should register a user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            name: 'Test User',
            email: 'user@blog.com',
            password: 'User@123',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });
});
