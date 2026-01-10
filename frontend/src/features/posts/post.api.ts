import axios from 'axios';
import api from '../../services/auth.interceptor';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchPostsApi = async () => {
  const response = await api.get('/v1/posts');
  return response.data;
};

export const createPostApi = async (
  payload: { title: string; content: string },
  token: string
) => {
  const response = await axios.post(
    `${API_URL}/v1/posts`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deletePostApi = (postId: string) =>
  api.delete(`/v1/posts/${postId}`);

export const fetchPostApi = (postId: string) =>
  api.get(`/v1/posts/${postId}`);

export const updatePostApi = (
  postId: string,
  data: { title: string; content: string }
) => api.put(`/v1/posts/${postId}`, data);
