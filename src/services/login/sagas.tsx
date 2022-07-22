import {all, put, takeEvery, call} from 'redux-saga/effects';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {initAuthSuccess} from '~Root/services/auth/actions';
import {
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
} from './constants';
import {GET_CREDENTIAL_REQUESTED} from '~Root/services/pubnub/constants';
import {USER_INFO_SUCCESS} from '~Root/services/user/constants';
import LoginAPI from './apis';
import {
  IActionForgotPasswordRequested,
  IActionForgotPasswordSuccess,
  IActionLoginRequested,
  IActionLoginSuccess,
} from './types';

function* handleLogin(payload: IActionLoginRequested) {
  try {
    const response: IActionLoginSuccess['payload'] = yield call(LoginAPI.handleLogin, payload?.payload);
    if (response?.success) {
      if (response?.data.confirmed_at) {
        yield AsyncStorage.setItem('token', response?.data?.token);
      } else {
        axios.defaults.headers.common = {Authorization: `Bearer ${response?.data?.token}`};
        yield put({type: USER_INFO_SUCCESS, payload: response});
      }
      yield put({type: LOGIN_SUCCESS, payload: response?.data});
      yield put({type: GET_CREDENTIAL_REQUESTED});

      yield put(initAuthSuccess());
      payload?.callback &&
        payload?.callback({
          success: true,
          status: !!response?.data.confirmed_at,
          message: response?.data.confirmed_at ? i18n.t('login_successful') : i18n.t('unauthorized'),
        });
    } else {
      yield put({type: LOGIN_FAILURE, payload: {error: response.message}});
      payload?.callback &&
        payload?.callback({
          success: false,
          status: false,
          message: response.message,
        });
    }
  } catch (error) {
    yield put({type: LOGIN_FAILURE, payload: {error: error}});
  }

  return payload;
}

function* handleForgotPassword(payload: IActionForgotPasswordRequested) {
  try {
    const response: IActionForgotPasswordSuccess['payload'] = yield call(
      LoginAPI.handleForgotPassword,
      payload?.payload,
    );
    if (response?.success) {
      yield put({type: FORGOT_PASSWORD_SUCCESS, payload: response?.data});

      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: FORGOT_PASSWORD_FAILURE, payload: {message: response.message}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: FORGOT_PASSWORD_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUESTED, handleLogin);
}

function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD_REQUESTED, handleForgotPassword);
}

export default function* loginWatchers() {
  yield all([watchLogin(), watchForgotPassword()]);
}
