import {all, put, takeEvery, call, takeLatest} from 'redux-saga/effects';

import NetworkAPI from './apis';
import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_SUCCESS,
  REMOVE_NETWORK_CONNECTION_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
} from './constants';
import {
  IActionNetworkConnectionListRequested,
  IActionNetworkConnectionListSuccess,
  IActionRemoveNetworkConnectionRequested,
  IActionRemoveNetworkConnectionSuccess,
} from './types';

function* getNetworkConnectionList(payload: IActionNetworkConnectionListRequested) {
  try {
    const response: IActionNetworkConnectionListSuccess['payload'] = yield call(NetworkAPI.getList, payload?.payload);
    if (response.success) {
      yield put({type: GET_NETWORK_CONNECTION_LIST_SUCCESS, payload: response.data});
      payload?.callback(response.data);
    } else {
      yield put({type: GET_NETWORK_CONNECTION_LIST_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_NETWORK_CONNECTION_LIST_FAILURE, payload: {message: error}});
  }
}

function* removeNetworkConnection(payload: IActionRemoveNetworkConnectionRequested) {
  try {
    const response: IActionRemoveNetworkConnectionSuccess['payload'] = yield call(
      NetworkAPI.removeNetworkConnection,
      payload?.payload,
    );

    if (response.success) {
      yield put({type: REMOVE_NETWORK_CONNECTION_SUCCESS, payload: response.data});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response.message,
        });
    } else {
      yield put({type: REMOVE_NETWORK_CONNECTION_FAILURE, payload: {message: response}});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response?.message,
        });
    }
  } catch (error) {
    yield put({type: REMOVE_NETWORK_CONNECTION_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
      });
  }
}

function* watchGetNetworkConnectionList() {
  yield takeLatest(GET_NETWORK_CONNECTION_LIST_REQUESTED, getNetworkConnectionList);
}

function* watchRemoveNetworkConnection() {
  yield takeEvery(REMOVE_NETWORK_CONNECTION_REQUESTED, removeNetworkConnection);
}

export default function* networkWatchers() {
  yield all([watchGetNetworkConnectionList(), watchRemoveNetworkConnection()]);
}
