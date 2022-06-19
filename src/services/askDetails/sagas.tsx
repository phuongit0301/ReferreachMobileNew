import {all, put, takeEvery, call} from 'redux-saga/effects';

import AskDetailsAPI from './apis';
import FeedItemsAPI from '~Root/services/feed/apis';
import {GET_ASK_DETAILS_REQUESTED, GET_ASK_DETAILS_SUCCESS, GET_ASK_DETAILS_FAILURE} from './constants';
import {IActionGetAskDetailsRequested, IActionGetAskDetailsSuccess} from './types';
import {IActionNetworkConnectionListSuccess} from '~Root/services/network/types';

function* getAskDetails(payload: IActionGetAskDetailsRequested) {
  try {
    const [responseDetails, responseNetwork]: [
      IActionGetAskDetailsSuccess['payload'],
      IActionNetworkConnectionListSuccess['payload'],
    ] = yield all([
      call(AskDetailsAPI.getAskDetails, payload?.payload),
      call(FeedItemsAPI.getSuggestIntroductionsList),
    ]);
    if (responseDetails.success && responseNetwork.success) {
      yield put({
        type: GET_ASK_DETAILS_SUCCESS,
        payload: {dataDetails: responseDetails.data, dataNetwork: responseNetwork.data},
      });
      payload?.callback && payload?.callback(responseDetails.data);
    } else {
      yield put({type: GET_ASK_DETAILS_FAILURE, payload: {message: responseDetails}});
      payload?.callback && payload?.callback(responseDetails?.data);
    }
  } catch (error) {
    yield put({type: GET_ASK_DETAILS_FAILURE, payload: {message: error}});
  }
}

function* watchGetAskDetails() {
  yield takeEvery(GET_ASK_DETAILS_REQUESTED, getAskDetails);
}

export default function* askDetailsWatchers() {
  yield all([watchGetAskDetails()]);
}
