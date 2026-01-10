import request from 'supertest';
import app from '../app';

describe('Post APIs', () => {
    it('should fetch posts', async () => {
        const res = await request(app).get('/api/v1/posts');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
