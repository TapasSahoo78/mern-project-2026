import { call, put, takeLatest } from 'redux-saga/effects';
import {
  authStart,
  authSuccess,
  authFailure,
} from './auth.slice';
import { loginApi, registerApi } from './auth.api';

function* loginSaga(action: any): Generator<any, any, any> {
  try {
    yield put(authStart());

    const response = yield call(loginApi, action.payload);

    yield put(
      authSuccess({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
  } catch (error: any) {
    yield put(authFailure(error.response?.data?.message || 'Login failed'));
  }
}

function* registerSaga(action: any): Generator<any, any, any> {
  try {
    yield put(authStart());

    const response = yield call(registerApi, action.payload);

    // After register, user is not logged in automatically
    yield put(authFailure(null));
  } catch (error: any) {
    yield put(authFailure(error.response?.data?.message || 'Register failed'));
  }
}

export function* authSaga() {
  yield takeLatest('auth/loginRequest', loginSaga);
  yield takeLatest('auth/registerRequest', registerSaga);
}
