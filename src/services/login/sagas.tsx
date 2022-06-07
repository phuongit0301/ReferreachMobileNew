import {all, put, takeEvery, call} from 'redux-saga/effects';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {initAuthSuccess} from '~Root/services/auth/actions';
import {LOGIN_FAILURE, LOGIN_REQUESTED, LOGIN_SUCCESS} from './constants';
import {USER_INFO_SUCCESS} from '~Root/services/user/constants';
import LoginAPI from './apis';
import {IActionLoginRequested, IActionLoginSuccess} from './types';

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

function* watchLogin() {
  yield takeEvery(LOGIN_REQUESTED, handleLogin);
}

export default function* loginWatchers() {
  yield all([watchLogin()]);
}
