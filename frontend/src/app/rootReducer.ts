import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import postReducer from '../features/posts/post.slice';
import commentReducer from '../features/comments/comment.slice';
import adminReducer from '../features/admin/admin.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  comments: commentReducer,
  admin: adminReducer,
});

export default rootReducer;

