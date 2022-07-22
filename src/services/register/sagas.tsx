import {all, put, takeEvery, call, select} from 'redux-saga/effects';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';

import {IGlobalState} from '~Root/types';
import RegisterAPI from './apis';
import {
  REGISTER_FAILURE,
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  VERIFY_ACCOUNT_REQUESTED,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  RENEW_VERIFICATION_CODE_REQUESTED,
  RENEW_VERIFICATION_CODE_SUCCESS,
  RENEW_VERIFICATION_CODE_FAILURE,
  INVITATION_REQUESTED,
  INVITATION_SUCCESS,
  INVITATION_FAILURE,
  INVITATION_REJECT_FAILURE,
  INVITATION_REJECT_REQUESTED,
  INVITATION_REJECT_SUCCESS,
} from './constants';
import {
  IActionInvitationRejectRequested,
  IActionInvitationRejectSuccess,
  IActionInvitationRequested,
  IActionInvitationSuccess,
  IActionRegisterRequested,
  IActionRegisterSuccess,
  IActionRenewVerificationCodeRequested,
  IActionRenewVerificationCodeSuccess,
  IActionVerifyAccountRequested,
  IActionVerifyAccountSuccess,
} from './types';

const getItems = (state: IGlobalState) => state.loginState;

function* handleRegister(payload: IActionRegisterRequested) {
  try {
    const response: IActionRegisterSuccess['payload'] = yield call(RegisterAPI.handleRegister, payload?.payload);
    if (response?.success) {
      yield put({type: REGISTER_SUCCESS, payload: {...response?.data, email: payload?.payload?.user?.email}});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: i18n.t('register_success'),
        });
    } else {
      yield put({type: REGISTER_FAILURE, payload: {error: response.message}});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
        });
    }
  } catch (error) {
    yield put({type: REGISTER_FAILURE, payload: {error: error}});
  }
}

function* handleVerifyCode(payload: IActionVerifyAccountRequested) {
  try {
    const response: IActionVerifyAccountSuccess['payload'] = yield call(RegisterAPI.verifyAccount, payload?.payload);
    if (response?.success) {
      const loginState = yield select(getItems);
      yield AsyncStorage.setItem('token', loginState?.token);

      yield put({type: VERIFY_ACCOUNT_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: '',
          verified: response?.verified,
          userInfo: response?.userInfo,
        });
    } else {
      yield put({type: VERIFY_ACCOUNT_FAILURE, payload: {error: response.message}});
      payload?.callback &&
        payload?.callback({
          success: false,
          message: response.message,
          verified: false,
          userInfo: null,
        });
    }
  } catch (error) {
    yield put({type: VERIFY_ACCOUNT_FAILURE, payload: {error: error}});
  }
}

function* handleRenewVerificationCode(payload: IActionRenewVerificationCodeRequested) {
  try {
    const response: IActionRenewVerificationCodeSuccess['payload'] = yield call(RegisterAPI.renewVerificationCode);
    if (response?.success) {
      yield put({type: RENEW_VERIFICATION_CODE_SUCCESS, payload: response});
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: RENEW_VERIFICATION_CODE_FAILURE, payload: {error: response.message}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: RENEW_VERIFICATION_CODE_FAILURE, payload: {error: error}});
  }
}

function* handleInvitation(payload: IActionInvitationRequested) {
  try {
    const response: IActionInvitationSuccess['payload'] = yield call(RegisterAPI.invitation, payload?.payload);
    if (response?.success) {
      yield put({type: INVITATION_SUCCESS, payload: response});
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: INVITATION_FAILURE, payload: {error: response.message}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: INVITATION_FAILURE, payload: {error: error}});
  }
}

function* handleInvitationReject(payload: IActionInvitationRejectRequested) {
  try {
    const response: IActionInvitationRejectSuccess['payload'] = yield call(
      RegisterAPI.invitationReject,
      payload?.payload,
    );
    if (response?.success) {
      yield put({type: INVITATION_REJECT_SUCCESS, payload: response});
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: INVITATION_REJECT_FAILURE, payload: {error: response.message}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: INVITATION_REJECT_FAILURE, payload: {error: error}});
  }
}

function* watchRegister() {
  yield takeEvery(REGISTER_REQUESTED, handleRegister);
}

function* watchVerifyAccount() {
  yield takeEvery(VERIFY_ACCOUNT_REQUESTED, handleVerifyCode);
}

function* watchRenewVerificationCode() {
  yield takeEvery(RENEW_VERIFICATION_CODE_REQUESTED, handleRenewVerificationCode);
}

function* watchInvitation() {
  yield takeEvery(INVITATION_REQUESTED, handleInvitation);
}

function* watchInvitationReject() {
  yield takeEvery(INVITATION_REJECT_REQUESTED, handleInvitationReject);
}

export default function* registerWatchers() {
  yield all([
    watchRegister(),
    watchVerifyAccount(),
    watchRenewVerificationCode(),
    watchInvitation(),
    watchInvitationReject(),
  ]);
  // yield all([sagaAsyncCallGenerator(ASYNC_REGISTER, RegisterAPI.handleRegister)]);
}
