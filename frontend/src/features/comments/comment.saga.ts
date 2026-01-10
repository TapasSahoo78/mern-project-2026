import { call, put, takeLatest, select } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchCommentsRequest,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    createCommentRequest,
    updateCommentRequest,
    deleteCommentRequest,
} from './comment.slice';
import {
    fetchCommentsApi,
    createCommentApi,
    updateCommentApi,
    deleteCommentApi,
} from './comment.api';

function* fetchCommentsSaga(action: any): Generator<any, any, any> {
    try {
        const response = yield call(fetchCommentsApi, action.payload.postId);
        yield put(fetchCommentsSuccess(response.data));
    } catch (error) {
        yield put(fetchCommentsFailure('Failed to load comments'));
    }
}

function* createCommentSaga(action: any): Generator<any, any, any> {
    try {
        const token = yield select((state: any) => state.auth.accessToken);
        yield call(createCommentApi, action.payload, token);
        yield put(fetchCommentsRequest({ postId: action.payload.postId }));
    } catch (error) {
        yield put(fetchCommentsFailure('Failed to add comment'));
    }
}

function* updateCommentSaga(
  action: PayloadAction<{
    commentId: string;
    postId: string;
    content: string;
  }>
): Generator<any, any, any> {
  try {
    const token = yield select((state: any) => state.auth.accessToken);

    yield call(
      updateCommentApi,
      {
        id: action.payload.commentId,
        content: action.payload.content,
      },
      token
    );

    // refresh comments
    yield put(fetchCommentsRequest({ postId: action.payload.postId }));
  } catch (error) {
    yield put(fetchCommentsFailure('Failed to update comment'));
  }
}


function* deleteCommentSaga(
  action: PayloadAction<{
    commentId: string;
    postId: string;
  }>
): Generator<any, any, any> {
  try {
    const token = yield select((state: any) => state.auth.accessToken);

    yield call(deleteCommentApi, action.payload.commentId, token);

    // refresh comments
    yield put(fetchCommentsRequest({ postId: action.payload.postId }));
  } catch (error) {
    yield put(fetchCommentsFailure('Failed to delete comment'));
  }
}

export function* commentSaga() {
    yield takeLatest(fetchCommentsRequest.type, fetchCommentsSaga);
    yield takeLatest(createCommentRequest.type, createCommentSaga);
    yield takeLatest(updateCommentRequest.type, updateCommentSaga);
    yield takeLatest(deleteCommentRequest.type, deleteCommentSaga);
}
