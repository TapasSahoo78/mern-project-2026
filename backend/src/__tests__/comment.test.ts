import request from 'supertest';
import app from '../app';

let token: string;
let commentId: string;
const postId = '696147bc0f2ba9452436b44f'; // existing post ID

describe('Comment APIs', () => {

  /* ================= PUBLIC ================= */

  it('GET /comments/:postId → fetch comments by post (public)', async () => {
    const res = await request(app)
      .get(`/api/v1/comments/${postId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
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

  it('POST /comments/:postId → add comment (auth)', async () => {
    const res = await request(app)
      .post(`/api/v1/comments/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'This is a test comment',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.content).toBe('This is a test comment');

    commentId = res.body.data._id;
  });

  /* ================= UPDATE ================= */

  it('PUT /comments/:commentId → update own comment', async () => {
    const res = await request(app)
      .put(`/api/v1/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Updated comment content',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.content).toBe('Updated comment content');
  });

  /* ================= DELETE ================= */

  it('DELETE /comments/:commentId → delete own comment', async () => {
    const res = await request(app)
      .delete(`/api/v1/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

});
