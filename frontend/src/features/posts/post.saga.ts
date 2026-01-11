import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
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
} from './post.slice';
import { fetchPostsApi, createPostApi, deletePostApi, fetchPostApi, updatePostApi } from './post.api';

function* fetchPostsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(fetchPostsApi);
    yield put(fetchPostsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPostsFailure("Failed to load posts"));
  }
}

function* createPostSaga(action: any): Generator<any, any, any> {
  try {
    const token = yield select((state: any) => state.auth.accessToken);
    const response = yield call(createPostApi, action.payload, token);
    yield put(fetchPostsRequest(response.data));
  } catch (error: any) {
    yield put(fetchPostsFailure('Failed to create post'));
  }
}

/* ===== FETCH SINGLE POST ===== */
function* fetchPostSaga(
  action: ReturnType<typeof fetchPostRequest>
): Generator<any, any, any> {
  try {
    const res = yield call(fetchPostApi, action.payload);
    
    yield put(fetchPostSuccess(res.data));
  } catch (error) {
    console.error(error);
  }
}

/* ===== UPDATE POST ===== */
function* updatePostSaga(
  action: ReturnType<typeof updatePostRequest>
): Generator<any, any, any> {
  try {
    const { id, title, content } = action.payload;

    const res = yield call(updatePostApi, id, { title, content });
    yield put(updatePostSuccess(res.data));

    // refresh list
    // yield put(fetchPostsRequest({}));
  } catch (error) {
    console.error(error);
  }
}
/* ===== DELETE POST ===== */
function* deletePostSaga(
  action: ReturnType<typeof deletePostRequest>
): Generator<any, any, any> {
  try {
    yield call(deletePostApi, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    console.error(error);
  }
}

export function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(createPostRequest.type, createPostSaga);
  yield takeLatest(fetchPostRequest.type, fetchPostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);
}
