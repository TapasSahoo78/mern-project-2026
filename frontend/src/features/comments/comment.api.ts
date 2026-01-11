import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCommentsApi = async (postId: string) => {
    const response = await axios.get(
        `${API_URL}/v1/comments/${postId}`
    );
    return response.data;
};

export const createCommentApi = async (
    payload: { postId: string; content: string },
    token: string
) => {
    const response = await axios.post(
        `${API_URL}/v1/comments/${payload.postId}`,
        { content: payload.content },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const updateCommentApi = async (
    payload: { id: string; content: string },
    token: string
) => {
    const response = await axios.put(
        `${API_URL}/v1/comments/${payload.id}`,
        { content: payload.content },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


export const deleteCommentApi = async (
    commentId: string,
    token: string
) => {
    const response = await axios.delete(
        `${API_URL}/v1/comments/${commentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};
