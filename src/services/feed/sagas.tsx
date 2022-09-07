import {all, put, takeEvery, call, select, takeLatest} from 'redux-saga/effects';

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
  GET_PUBLIC_PROFILE_SUCCESS,
  GET_PUBLIC_PROFILE_FAILURE,
  GET_PUBLIC_PROFILE_REQUESTED,
  CREATE_INTRODUCTION_SUCCESS,
  CREATE_INTRODUCTION_FAILURE,
  CREATE_INTRODUCTION_REQUESTED,
  GET_SUGGEST_INTRODUCTION_LIST_REQUESTED,
  GET_SUGGEST_INTRODUCTION_LIST_SUCCESS,
  GET_SUGGEST_INTRODUCTION_LIST_FAILURE,
} from './constants';
import {
  IActionCreateIntroductionRequested,
  IActionCreateIntroductionSuccess,
  IActionFeedItemPaginationRequested,
  IActionFeedItemPaginationSuccess,
  IActionFeedItemsListRequested,
  IActionFeedItemsListSuccess,
  IActionGetPublicProfileRequested,
  IActionGetPublicProfileSuccess,
  IActionSetFeedItemReadRequested,
  IActionSetFeedItemReadSuccess,
  IActionSuggestIntroductionListRequested,
  IFeedItemsState,
} from './types';
import {IActionNetworkConnectionListSuccess} from '~Root/services/network/types';
import {IGlobalState} from '~Root/types';

const getFeedState = (state: IGlobalState) => state.feedState;

function* getFeedItemsList(payload: IActionFeedItemsListRequested) {
  try {
    const [responseFeed, responseNetwork]: [
      IActionFeedItemsListSuccess['payload'],
      IActionNetworkConnectionListSuccess['payload'],
    ] = yield all([
      call(FeedItemsAPI.getList, payload?.payload?.feedPagination),
      call(FeedItemsAPI.getSuggestIntroductionsList, {
        page: payload?.payload?.networkPage,
        per: payload?.payload?.networkPer,
      }),
    ]);
    if (responseFeed.success && responseNetwork.success) {
      const dataNetwork: IActionNetworkConnectionListSuccess['payload'] = yield call(
        FeedItemsAPI.filterUserTrustNetwork,
        {
          dataFeed: responseFeed.data,
          dataNetwork: responseNetwork.data,
        },
      );

      yield put({
        type: GET_FEED_ITEMS_LIST_SUCCESS,
        payload: {dataFeed: responseFeed.data, dataNetwork, dataNetworkOriginal: responseNetwork.data},
      });
      payload?.callback && payload?.callback(responseFeed.data);
    } else {
      yield put({type: GET_FEED_ITEMS_LIST_FAILURE, payload: {message: responseFeed}});
      payload?.callback && payload?.callback(responseFeed?.data);
    }
  } catch (error) {
    yield put({type: GET_FEED_ITEMS_LIST_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getSuggestIntroductionList(payload: IActionSuggestIntroductionListRequested) {
  try {
    const response = yield call(FeedItemsAPI.getSuggestIntroductionsList, payload?.payload);
    if (response.success) {
      const feedState: IFeedItemsState = yield select(getFeedState);

      const dataNetwork: IActionNetworkConnectionListSuccess['payload'] = yield call(
        FeedItemsAPI.filterUserTrustNetwork,
        {
          dataFeed: feedState.dataFeed,
          dataNetwork: response.data,
        },
      );

      yield put({
        type: GET_SUGGEST_INTRODUCTION_LIST_SUCCESS,
        payload: {dataNetwork, dataNetworkOriginal: dataNetwork},
      });
      payload?.callback && payload?.callback(dataNetwork);
    } else {
      yield put({type: GET_SUGGEST_INTRODUCTION_LIST_FAILURE, payload: {message: response?.message}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: GET_SUGGEST_INTRODUCTION_LIST_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getFeedItemPagination(payload: IActionFeedItemPaginationRequested) {
  try {
    const response: IActionFeedItemPaginationSuccess['payload'] = yield call(FeedItemsAPI.getList, payload?.payload);
    const feedState: IFeedItemsState = yield select(getFeedState);

    if (response.success) {
      const dataNetwork: IActionNetworkConnectionListSuccess['payload'] = yield call(
        FeedItemsAPI.filterUserTrustNetwork,
        {
          dataFeed: response.data,
          dataNetwork: feedState.dataNetworkOriginal,
        },
      );

      console.log('dataNetwork======>', dataNetwork);
      yield put({
        type: GET_FEED_ITEM_PAGINATION_SUCCESS,
        payload: {dataFeed: response.data, dataNetwork},
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_FEED_ITEM_PAGINATION_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_FEED_ITEM_PAGINATION_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
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
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getPublicProfile(payload: IActionGetPublicProfileRequested) {
  try {
    const response: IActionGetPublicProfileSuccess['payload'] = yield call(
      FeedItemsAPI.getPublicProfile,
      payload?.payload,
    );
    if (response.success) {
      yield put({
        type: GET_PUBLIC_PROFILE_SUCCESS,
        payload: response.data,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_PUBLIC_PROFILE_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_PUBLIC_PROFILE_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* createIntroduction(payload: IActionCreateIntroductionRequested) {
  try {
    const response: IActionCreateIntroductionSuccess['payload'] = yield call(
      FeedItemsAPI.createIntroduction,
      payload?.payload,
    );
    if (response.success) {
      yield put({
        type: CREATE_INTRODUCTION_SUCCESS,
        payload: response.data,
      });
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: CREATE_INTRODUCTION_FAILURE, payload: response});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: CREATE_INTRODUCTION_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* watchGetFeedItemsList() {
  yield takeEvery(GET_FEED_ITEMS_LIST_REQUESTED, getFeedItemsList);
}

function* watchGetSuggestIntroductionList() {
  yield takeEvery(GET_SUGGEST_INTRODUCTION_LIST_REQUESTED, getSuggestIntroductionList);
}

function* watchGetFeedItemPagination() {
  yield takeLatest(GET_FEED_ITEM_PAGINATION_REQUESTED, getFeedItemPagination);
}

function* watchSetFeedItemRead() {
  yield takeLatest(SET_FEED_ITEM_READ_REQUESTED, setFeedItemRead);
}

function* watchGetPublicProfile() {
  yield takeEvery(GET_PUBLIC_PROFILE_REQUESTED, getPublicProfile);
}

function* watchCreateIntroduction() {
  yield takeEvery(CREATE_INTRODUCTION_REQUESTED, createIntroduction);
}

export default function* feedItemsWatchers() {
  yield all([
    watchGetFeedItemsList(),
    watchGetSuggestIntroductionList(),
    watchGetFeedItemPagination(),
    watchSetFeedItemRead(),
    watchGetPublicProfile(),
    watchCreateIntroduction(),
  ]);
}
