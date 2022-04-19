import {all, put, takeEvery, call, select} from 'redux-saga/effects';

import {clearToken} from '~Root/services/storage';
import UserAPI from './apis';
import {
  GET_ASK_INTRODUCER_SUCCESS,
  GET_ASK_RESPONDER_SUCCESS,
  GET_TAG_REQUESTED,
  GET_TAG_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  USER_INFO_FAILURE,
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
} from './constants';
import {
  IActionGetTagRequested,
  IActionUpdateUserProfileSuccess,
  IActionUserInfoRequested,
  IActionUserInfoSuccess,
} from './types';
import {initAuthFailure} from '~Root/services/auth/actions';
import {IGlobalState} from '~Root/types';

const getItems = (state: IGlobalState) => state.askState;

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

function* updateUserProfile(payload: any) {
  try {
    let dataPayload: IActionUpdateUserProfileSuccess['payload'] = {
      data: undefined,
      success: false,
      message: '',
    };
    if (payload?.payload?.avatar) {
      dataPayload = yield call(UserAPI.updateUserAvatar, payload?.payload?.avatar);
    }

    if (payload?.payload?.data) {
      dataPayload = yield call(UserAPI.updateUserProfile, payload?.payload?.data);
    }

    // const response: IActionUpdateUserProfileSuccess['payload'] = yield call(
    //   UserAPI.updateUserProfile,
    //   payload?.payload,
    // );
    yield put({type: UPDATE_USER_PROFILE_SUCCESS, payload: dataPayload?.data});
    payload?.callback();
  } catch (error) {
    yield put({type: UPDATE_USER_PROFILE_FAILURE, payload: {error: error}});
    payload?.callback && payload?.callback();
  }

  return payload;
}


function* watchGetUser() {
  yield takeEvery(USER_INFO_REQUESTED, getUserInfo);
}

function* watchUpdateUserProfile() {
  yield takeEvery(UPDATE_USER_PROFILE_REQUESTED, updateUserProfile);
}

export default function* userWatchers() {
  yield all([watchGetUser(), watchUpdateUserProfile()]);
}
