import {all, put, takeEvery, call} from 'redux-saga/effects';

import {clearToken} from '~Root/services/storage';
import UserAPI from './apis';
import {USER_INFO_FAILURE, USER_INFO_REQUESTED, USER_INFO_SUCCESS} from './constants';
import {IActionUserInfoRequested, IActionUserInfoSuccess} from './types';
import {initAuthFailure} from '~Root/services/auth/actions';

function* getUserInfo(payload: IActionUserInfoRequested) {
  try {
    const response: IActionUserInfoSuccess['payload'] = yield call(UserAPI.handleUserInfo);
    if (response?.success) {
      yield put({type: USER_INFO_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          error: '',
          data: response?.data,
        });
    } else {
      yield call(clearToken);
      yield put({type: USER_INFO_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          error: response?.message,
        });

      yield put(initAuthFailure({error: response?.message}));
    }
  } catch (error) {
    yield call(clearToken);
    yield put({type: USER_INFO_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        error: error,
      });
    yield put(initAuthFailure({error: JSON.stringify(error)}));
  }
}

function* watchGetUser() {
  yield takeEvery(USER_INFO_REQUESTED, getUserInfo);
}

export default function* userWatchers() {
  yield all([watchGetUser()]);
}
