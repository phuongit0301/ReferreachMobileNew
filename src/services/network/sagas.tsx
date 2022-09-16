import {all, put, takeEvery, call, takeLatest} from 'redux-saga/effects';

import NetworkAPI from './apis';
import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_SUCCESS,
  REMOVE_NETWORK_CONNECTION_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  ON_CREATE_MASS_INVITATION_SUCCESS,
  ON_CREATE_MASS_INVITATION_FAILURE,
  ON_CREATE_MASS_INVITATION_REQUESTED,
  GET_MASS_INVITATION_LIST_SUCCESS,
  GET_MASS_INVITATION_LIST_FAILURE,
  GET_MASS_INVITATION_LIST_REQUESTED,
  REMOVE_MASS_INVITE_REQUESTED,
  REMOVE_MASS_INVITE_SUCCESS,
  REMOVE_MASS_INVITE_FAILURE,
} from './constants';
import {
  IActionCreateMassInvitationRequested,
  IActionCreateMassInvitationSuccess,
  IActionGetMassInvitationListRequested,
  IActionGetMassInvitationListSuccess,
  IActionNetworkConnectionListRequested,
  IActionNetworkConnectionListSuccess,
  IActionRemoveMassInviteRequested,
  IActionRemoveMassInviteSuccess,
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

function* getMassInvitationList(payload: IActionGetMassInvitationListRequested) {
  try {
    const response: IActionGetMassInvitationListSuccess['payload'] = yield call(NetworkAPI.getMassInvitationList);
    if (response.success) {
      yield put({type: GET_MASS_INVITATION_LIST_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response.message,
          data: response?.data,
        });
    } else {
      yield put({type: GET_MASS_INVITATION_LIST_FAILURE, payload: {message: response}});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response?.message,
          data: [],
        });
    }
  } catch (error) {
    yield put({type: GET_MASS_INVITATION_LIST_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [],
      });
  }
}

function* createMassInvitation(payload: IActionCreateMassInvitationRequested) {
  try {
    const response: IActionCreateMassInvitationSuccess['payload'] = yield call(
      NetworkAPI.createMassInvitation,
      payload?.payload,
    );
    if (response.success) {
      yield put({type: ON_CREATE_MASS_INVITATION_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response.message,
          data: response?.data,
        });
    } else {
      yield put({type: ON_CREATE_MASS_INVITATION_FAILURE, payload: {message: response}});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response?.message,
          data: [],
        });
    }
  } catch (error) {
    yield put({type: ON_CREATE_MASS_INVITATION_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [],
      });
  }
}

function* removemMassInvite(payload: IActionRemoveMassInviteRequested) {
  try {
    const response: IActionRemoveMassInviteSuccess['payload'] = yield call(
      NetworkAPI.removeMassInvite,
      payload?.payload,
    );
    if (response.success) {
      yield put({type: REMOVE_MASS_INVITE_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response.message,
          data: response?.data,
        });
    } else {
      yield put({type: REMOVE_MASS_INVITE_FAILURE, payload: {message: response}});
      payload?.callback &&
        payload?.callback({
          success: response.success,
          message: response?.message,
          data: [],
        });
    }
  } catch (error) {
    yield put({type: REMOVE_MASS_INVITE_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        success: false,
        message: error as string,
        data: [],
      });
  }
}

function* watchGetNetworkConnectionList() {
  yield takeLatest(GET_NETWORK_CONNECTION_LIST_REQUESTED, getNetworkConnectionList);
}

function* watchRemoveNetworkConnection() {
  yield takeEvery(REMOVE_NETWORK_CONNECTION_REQUESTED, removeNetworkConnection);
}

function* watchRemoveMassInvite() {
  yield takeEvery(REMOVE_MASS_INVITE_REQUESTED, removemMassInvite);
}

function* watchGetMassInvitationList() {
  yield takeEvery(GET_MASS_INVITATION_LIST_REQUESTED, getMassInvitationList);
}

function* watchCreateMassInvitation() {
  yield takeEvery(ON_CREATE_MASS_INVITATION_REQUESTED, createMassInvitation);
}

export default function* networkWatchers() {
  yield all([
    watchGetNetworkConnectionList(),
    watchRemoveNetworkConnection(),
    watchCreateMassInvitation(),
    watchGetMassInvitationList(),
    watchRemoveMassInvite(),
  ]);
}
