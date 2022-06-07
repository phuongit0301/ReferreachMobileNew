import {all, put, takeEvery, call} from 'redux-saga/effects';

import {clearToken} from '~Root/services/storage';
import UserAPI from './apis';
import {
  UPDATE_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR_REQUESTED,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_IN_APP_STATUS_FAILURE,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  UPDATE_USER_IN_APP_STATUS_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
} from './constants';
import {
  IActionUpdateUserAvatarRequested,
  IActionUpdateUserAvatarSuccess,
  IActionUpdateUserInAppStatusRequested,
  IActionUpdateUserInAppStatusSuccess,
  IActionUpdateUserProfileRequested,
  IActionUpdateUserProfileSuccess,
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
      yield put(initAuthFailure({error: response?.message}));
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: null,
        });
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
        message: error as string,
        data: null,
      });
    yield put(initAuthFailure({error: JSON.stringify(error)}));
  }
}

function* updateUserProfile(payload: IActionUpdateUserProfileRequested) {
  try {
    const response: IActionUpdateUserProfileSuccess['payload'] = yield call(
      UserAPI.updateUserProfile,
      payload?.payload,
    );
    if (response?.success) {
      yield put({type: UPDATE_USER_PROFILE_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: '',
          data: response.data,
        });
    } else {
      yield put({type: UPDATE_USER_PROFILE_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: null,
        });
    }
  } catch (error) {
    yield put({type: UPDATE_USER_PROFILE_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: null,
      });
  }
}

function* updateUserAvatar(payload: IActionUpdateUserAvatarRequested) {
  try {
    const response: IActionUpdateUserAvatarSuccess['payload'] = yield call(UserAPI.updateUserAvatar, payload?.payload);
    console.log('========response==========>', response);
    if (response?.success) {
      yield put({type: UPDATE_USER_AVATAR_SUCCESS, payload: response?.data});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: '',
          data: response.data,
        });
    } else {
      yield put({type: UPDATE_USER_AVATAR_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: null,
        });
    }
  } catch (error) {
    yield put({type: UPDATE_USER_AVATAR_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: null,
      });
  }
}

function* watchGetUser() {
  yield takeEvery(USER_INFO_REQUESTED, getUserInfo);
}

function* watchUpdateUserInAppStatus() {
  yield takeEvery(UPDATE_USER_IN_APP_STATUS_REQUESTED, updateUserInAppStatus);
}

function* watchUpdateUserProfile() {
  yield takeEvery(UPDATE_USER_PROFILE_REQUESTED, updateUserProfile);
}

function* watchUpdateUserAvatar() {
  yield takeEvery(UPDATE_USER_AVATAR_REQUESTED, updateUserAvatar);
}

export default function* userWatchers() {
  yield all([watchGetUser(), watchUpdateUserInAppStatus(), watchUpdateUserProfile(), watchUpdateUserAvatar()]);
}
