import {all, put, takeEvery, call} from 'redux-saga/effects';

import {clearToken} from '~Root/services/storage';
import UserAPI from './apis';
import {
  UPDATE_USER_IN_APP_STATUS_FAILURE,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  UPDATE_USER_IN_APP_STATUS_SUCCESS,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
} from './constants';
import {
  IActionUpdateUserInAppStatusRequested,
  IActionUpdateUserInAppStatusSuccess,
  IActionUserInfoRequested,
  IActionUserInfoSuccess,
} from './types';
import {initAuthFailure} from '~Root/services/auth/actions';

function* getUserInfo(payload: IActionUserInfoRequested) {
  try {
    const response: IActionUserInfoSuccess['payload'] = yield call(UserAPI.handleUserInfo);
    if (response?.success) {
      yield put({type: USER_INFO_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          data: response?.data,
          success: response?.success,
          message: '',
        });
    } else {
      yield call(clearToken);
      yield put({type: USER_INFO_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: null,
        });

      yield put(initAuthFailure({error: response?.message}));
    }
  } catch (error) {
    yield call(clearToken);
    yield put({type: USER_INFO_FAILURE, payload: {error: error}});
    yield put(initAuthFailure({error: JSON.stringify(error)}));
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error,
        data: null,
      });
  }
}

function* updateUserInAppStatus(payload: IActionUpdateUserInAppStatusRequested) {
  try {
    const response: IActionUpdateUserInAppStatusSuccess['payload'] = yield call(
      UserAPI.updateUserInAppStatus,
      payload?.payload,
    );
    if (response?.success) {
      yield put({type: UPDATE_USER_IN_APP_STATUS_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: '',
          data: response.data,
        });
    } else {
      yield call(clearToken);
      yield put({type: UPDATE_USER_IN_APP_STATUS_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: null,
        });

      yield put(initAuthFailure({error: response?.message}));
    }
  } catch (error) {
    yield call(clearToken);
    yield put({type: UPDATE_USER_IN_APP_STATUS_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error,
        data: null,
      });
    yield put(initAuthFailure({error: JSON.stringify(error)}));
  }
}

function* watchGetUser() {
  yield takeEvery(USER_INFO_REQUESTED, getUserInfo);
}

function* watchUpdateUserInAppStatus() {
  yield takeEvery(UPDATE_USER_IN_APP_STATUS_REQUESTED, updateUserInAppStatus);
}

export default function* userWatchers() {
  yield all([watchGetUser(), watchUpdateUserInAppStatus()]);
}
