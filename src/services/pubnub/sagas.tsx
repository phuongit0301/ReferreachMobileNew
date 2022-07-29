import {all, put, call, takeLatest} from 'redux-saga/effects';

import PubNubAPI from './apis';
import {GET_CREDENTIAL_REQUESTED, GET_CREDENTIAL_SUCCESS, GET_CREDENTIAL_FAILURE} from './constants';
import {IActionGetCredentialRequest, IActionGetCredentialSuccess} from './types';

function* getCredential(payload: IActionGetCredentialRequest) {
  try {
    const response: IActionGetCredentialSuccess['payload'] = yield call(PubNubAPI.getCredential);
    if (response?.success) {
      yield put({type: GET_CREDENTIAL_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: '',
          data: response?.data,
        });
    } else {
      yield put({type: GET_CREDENTIAL_FAILURE, payload: {error: response?.message}});
      payload?.callback &&
        payload?.callback({
          success: response?.success,
          message: response?.message,
          data: response?.data,
        });
    }
  } catch (error) {
    yield put({type: GET_CREDENTIAL_FAILURE, payload: {error: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [],
      });
  }
}

function* watchGetCredential() {
  yield takeLatest(GET_CREDENTIAL_REQUESTED, getCredential);
}

export default function* pubnubWatchers() {
  yield all([watchGetCredential()]);
}
