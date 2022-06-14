import {all, put, takeEvery, call} from 'redux-saga/effects';

import FeedItemsAPI from './apis';
import {
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEMS_LIST_SUCCESS,
  GET_FEED_ITEMS_LIST_FAILURE,
  GET_FEED_ITEM_PAGINATION_SUCCESS,
  GET_FEED_ITEM_PAGINATION_FAILURE,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_ITEM_READ_SUCCESS,
  SET_FEED_ITEM_READ_FAILURE,
} from './constants';
import {
  IActionFeedItemPaginationRequested,
  IActionFeedItemPaginationSuccess,
  IActionFeedItemsListRequested,
  IActionFeedItemsListSuccess,
  IActionSetFeedItemReadRequested,
  IActionSetFeedItemReadSuccess,
} from './types';
import {IActionNetworkConnectionListSuccess} from '~Root/services/network/types';

function* getFeedItemsList(payload: IActionFeedItemsListRequested) {
  try {
    const [responseFeed, responseNetwork]: [
      IActionFeedItemsListSuccess['payload'],
      IActionNetworkConnectionListSuccess['payload'],
    ] = yield all([call(FeedItemsAPI.getList, payload?.payload), call(FeedItemsAPI.getSuggestIntroductionsList)]);
    if (responseFeed.success && responseNetwork.success) {
      yield put({
        type: GET_FEED_ITEMS_LIST_SUCCESS,
        payload: {dataFeed: responseFeed.data, dataNetwork: responseNetwork.data},
      });
      payload?.callback && payload?.callback(responseFeed.data);
    } else {
      yield put({type: GET_FEED_ITEMS_LIST_FAILURE, payload: {message: responseFeed}});
      payload?.callback && payload?.callback(responseFeed?.data);
    }
  } catch (error) {
    yield put({type: GET_FEED_ITEMS_LIST_FAILURE, payload: {message: error}});
  }
}

function* getFeedItemPagination(payload: IActionFeedItemPaginationRequested) {
  try {
    const response: IActionFeedItemPaginationSuccess['payload'] = yield call(FeedItemsAPI.getList, payload?.payload);
    if (response.success) {
      yield put({
        type: GET_FEED_ITEM_PAGINATION_SUCCESS,
        payload: {dataFeed: response.data},
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_FEED_ITEM_PAGINATION_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_FEED_ITEM_PAGINATION_FAILURE, payload: {message: error}});
  }
}

function* setFeedItemRead(payload: IActionSetFeedItemReadRequested) {
  try {
    const response: IActionSetFeedItemReadSuccess['payload'] = yield call(
      FeedItemsAPI.setFeedItemRead,
      payload?.payload,
    );
    if (response.success) {
      yield put({
        type: SET_FEED_ITEM_READ_SUCCESS,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: SET_FEED_ITEM_READ_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: SET_FEED_ITEM_READ_FAILURE, payload: {message: error}});
  }
}

function* watchGetFeedItemsList() {
  yield takeEvery(GET_FEED_ITEMS_LIST_REQUESTED, getFeedItemsList);
}

function* watchGetFeedItemPagination() {
  yield takeEvery(GET_FEED_ITEM_PAGINATION_REQUESTED, getFeedItemPagination);
}

function* watchSetFeedItemRead() {
  yield takeEvery(SET_FEED_ITEM_READ_REQUESTED, setFeedItemRead);
}

export default function* feedItemsWatchers() {
  yield all([watchGetFeedItemsList(), watchGetFeedItemPagination(), watchSetFeedItemRead()]);
}
