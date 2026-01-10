import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  adminStart,
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchUsersRequest,
  fetchUsersSuccess,
  updateUserRoleRequest,
  adminFailure,
} from './admin.slice';
import {
  fetchDashboardStatsApi,
  fetchUsersApi,
  updateUserRoleApi,
} from './admin.api';

function* fetchStatsSaga(): Generator<any, any, any> {
  try {
    yield put(adminStart());
    const token = yield select((state: any) => state.auth.accessToken);
    const res = yield call(fetchDashboardStatsApi, token);
    yield put(fetchStatsSuccess(res.data));
  } catch {
    yield put(adminFailure('Failed to load dashboard stats'));
  }
}

function* fetchUsersSaga(): Generator<any, any, any> {
  try {
    yield put(adminStart());
    const token = yield select((state: any) => state.auth.accessToken);
    const res = yield call(fetchUsersApi, token);
    yield put(fetchUsersSuccess(res.data));
  } catch {
    yield put(adminFailure('Failed to load users'));
  }
}

function* updateUserRoleSaga(action: any): Generator<any, any, any> {
  try {
    const token = yield select((state: any) => state.auth.accessToken);
    yield call(updateUserRoleApi, action.payload.userId, action.payload.role, token);
    yield put(fetchUsersRequest());
  } catch {
    yield put(adminFailure('Failed to update role'));
  }
}

export function* adminSaga() {
  yield takeLatest(fetchStatsRequest.type, fetchStatsSaga);
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(updateUserRoleRequest.type, updateUserRoleSaga);
}
