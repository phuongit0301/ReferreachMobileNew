import {all, takeEvery} from 'redux-saga/effects';

import {IAsyncCall} from '~Root/types';
import ChatAPI from './apis';
import {ASYNC_LIST_MATCHES} from './constants';

function* asyncHandler(action: IAsyncCall, api: () => Promise<any>, payload: any) {
  // try {
  //   const response: IActionCreateChatSuccess['payload'] = yield call(api);
  //   if (response) {
  //     yield put({type: action.SUCCESS, payload: response});
  //     payload?.callback({
  //       success: true,
  //       error: '',
  //     });
  //   } else {
  //     yield put({type: action.FAILURE, payload: {error: response}});
  //     payload?.callback({
  //       success: true,
  //       error: '',
  //     });
  //   }
  // } catch (error) {
  //   yield put({type: action.FAILURE, payload: {error: error.message}});
  // }

  return payload;
}

function* sagaAsyncCallGenerator(action: IAsyncCall, api: () => Promise<any>) {
  yield takeEvery(action.REQUESTED, asyncHandler, action, api);
}

export default function* chatWatchers() {
  yield all([sagaAsyncCallGenerator(ASYNC_LIST_MATCHES, ChatAPI.handleFetchChat)]);
}
