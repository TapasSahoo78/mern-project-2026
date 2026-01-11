import request from 'supertest';
import app from '../app';

let token: string;
let postId: string;

describe('Post APIs', () => {

    /* ================= PUBLIC ================= */

    it('GET /posts → should fetch posts (public)', async () => {
        const res = await request(app).get('/api/v1/posts');

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.posts)).toBe(true);
    });

    /* ================= AUTH ================= */

    it('POST /auth/login → login user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'user@blog.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBeDefined();

        token = res.body.accessToken;
    });

    /* ================= CREATE ================= */

    it('POST /posts → create post (auth)', async () => {
        const res = await request(app)
            .post('/api/v1/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                content: 'This is a test post content with enough length.',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);

        postId = res.body.data._id;
    });

    /* ================= SINGLE ================= */

    it('GET /posts/:id → fetch single post', async () => {
        const res = await request(app)
            .get(`/api/v1/posts/${postId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data._id).toBe(postId);
    });

    /* ================= UPDATE ================= */

    it('PUT /posts/:id → update post (owner)', async () => {
        const res = await request(app)
            .put(`/api/v1/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Title',
                content: 'Updated content with enough length.',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.title).toBe('Updated Title');
    });

    /* ================= DELETE ================= */

    it('DELETE /posts/:id → delete post', async () => {
        const res = await request(app)
            .delete(`/api/v1/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

});
