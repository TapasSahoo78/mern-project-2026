import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Comment, CommentState } from './comment.types';

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsRequest(
      state,
      _action: PayloadAction<{ postId: string }>
    ) {
      state.loading = true;
      state.error = null;
    },

    fetchCommentsSuccess(state, action: PayloadAction<Comment[]>) {
      state.loading = false;
      state.comments = action.payload;
    },

    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createCommentRequest(
      _state,
      _action: PayloadAction<{ postId: string; content: string }>
    ) { },
    updateCommentRequest(
      _state,
      _action: PayloadAction<{
        commentId: string;
        postId: string;
        content: string;
      }>
    ) { },

    deleteCommentRequest(
      _state,
      _action: PayloadAction<{
        commentId: string;
        postId: string;
      }>
    ) { 
      
    },
  }
});

export const {
  fetchCommentsRequest,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  createCommentRequest,
  updateCommentRequest,
  deleteCommentRequest,
} = commentSlice.actions;

export default commentSlice.reducer;
