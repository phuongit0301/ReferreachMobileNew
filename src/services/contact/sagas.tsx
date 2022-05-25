import {all, call, put, takeEvery} from 'redux-saga/effects';

import {INVITE_USER_CONTACT_FAILURE, INVITE_USER_CONTACT_REQUESTED, INVITE_USER_CONTACT_SUCCESS} from './constants';
import {IActionInviteUserContactRequested, IActionInviteUserContactSuccess} from './types';
import ContactAPI from './apis';

function* inviteUserContact(payload: IActionInviteUserContactRequested) {
  try {
    const response: IActionInviteUserContactSuccess['payload'] = yield call(
      ContactAPI.inviteUserContact,
      payload?.payload,
    );
    if (response?.success) {
      yield put({type: INVITE_USER_CONTACT_SUCCESS, payload: response});
      payload?.callback &&
        payload?.callback({
          success: true,
          message: '',
        });
    }
  } catch (error) {
    yield put({type: INVITE_USER_CONTACT_FAILURE, payload: {error: error}});
  }
}
export default function* contactWatchers() {
  yield all([takeEvery(INVITE_USER_CONTACT_REQUESTED, inviteUserContact)]);
}
