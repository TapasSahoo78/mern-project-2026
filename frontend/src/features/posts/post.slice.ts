import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
    posts: any[];
    selectedPost: any | null;
    loading: boolean;
    page: number;
    totalPages: number;
}

const initialState: PostsState = {
    posts: [],
    selectedPost: null,
    loading: false,
    page: 1,
    totalPages: 1,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        /* ===== LIST ===== */
        fetchPostsRequest(
            state,
            _action: PayloadAction<{ page?: number; search?: string }>
        ) {
            state.loading = true;
        },
        fetchPostsSuccess(state, action) {
            state.loading = false;
            state.posts = action.payload;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
        },
        fetchPostsFailure(state,action) {
            state.loading = false;
        },
        /* ===== CREATE POST ===== */
        createPostRequest(
            _state,
            _action: PayloadAction<{ title: string; content: string }>
        ) { },

        /* ===== SINGLE POST ===== */
        fetchPostRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        fetchPostSuccess(state, action: PayloadAction<any>) {            
            state.loading = false;
            state.selectedPost = action.payload;
        },

        /* ===== UPDATE POST ===== */
        updatePostRequest(
            state,
            _action: PayloadAction<{ id: string; title: string; content: string }>
        ) {
            state.loading = true;
        },
        updatePostSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.selectedPost = action.payload;

            state.posts = state.posts.map((p) =>
                p._id === action.payload._id ? action.payload : p
            );
        },

        /* ===== DELETE ===== */
        deletePostRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        deletePostSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.posts = state.posts.filter((p) => p._id !== action.payload);
        },
    },
});

export const {
    fetchPostsRequest,
    fetchPostsSuccess,
    fetchPostsFailure,
    createPostRequest,
    fetchPostRequest,
    fetchPostSuccess,
    updatePostRequest,
    updatePostSuccess,
    deletePostRequest,
    deletePostSuccess,
} = postSlice.actions;

export default postSlice.reducer;
