import {all, put, takeEvery, call} from 'redux-saga/effects';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';

import {LOGIN_FAILURE, LOGIN_REQUESTED, LOGIN_SUCCESS} from './constants';
import LoginAPI from './apis';
import {IActionLoginRequested, IActionLoginSuccess} from './types';
import {initAuthSuccess} from '../auth/actions';

function* handleLogin(payload: IActionLoginRequested) {
  try {
    const response: IActionLoginSuccess['payload'] = yield call(LoginAPI.handleLogin, payload?.payload);
    if (response?.success) {
      yield AsyncStorage.setItem('token', response?.data?.email);
      yield put({type: LOGIN_SUCCESS, payload: response?.data});
      yield put(initAuthSuccess());
      payload?.callback &&
        payload?.callback({
          success: true,
          status: true,
          message: i18n.t('login_success'),
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

function* watchLogin() {
  yield takeEvery(LOGIN_REQUESTED, handleLogin);
}

export default function* loginWatchers() {
  yield all([watchLogin()]);
}
