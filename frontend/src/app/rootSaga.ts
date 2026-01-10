import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/auth.saga';
import { postSaga } from '../features/posts/post.saga';
import { commentSaga } from '../features/comments/comment.saga';
import { adminSaga } from '../features/admin/admin.saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    postSaga(),
    commentSaga(),
    adminSaga(),
  ]);
}


