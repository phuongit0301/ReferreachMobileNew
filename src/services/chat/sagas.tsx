import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {IGlobalState} from '~Root/types';

import ChatAPI from './apis';
import {
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_SUCCESS,
  GET_CHAT_CONTEXT_FAILURE,
  GET_CHAT_FEED_SUCCESS,
  GET_CHAT_FEED_FAILURE,
  GET_CHAT_FEED_REQUESTED,
  ON_PIN_REQUESTED,
  ON_PIN_FAILURE,
  ON_PIN_SUCCESS,
  ON_UN_PIN_REQUESTED,
  ON_UN_PIN_FAILURE,
  ON_UN_PIN_SUCCESS,
  GET_USER_CHAT_LIST_SUCCESS,
  GET_USER_CHAT_LIST_FAILURE,
  GET_USER_CHAT_LIST_REQUESTED,
} from './constants';
import {
  IActionChatContextRequested,
  IActionChatContextSuccess,
  IActionChatFeedRequested,
  IActionChatFeedSuccess,
  IActionGetUserChatListRequested,
  IActionGetUserChatListSuccess,
  IActionOnPinRequested,
  IActionOnPinSuccess,
  IActionOnUnPinRequested,
  IActionOnUnPinSuccess,
  IChatState,
} from './types';

const getChatState = (state: IGlobalState) => state.chatState;

function* getChatContext(payload: IActionChatContextRequested) {
  try {
    const response: IActionChatContextSuccess['payload'] = yield call(ChatAPI.getChatContext, payload?.payload);
    if (response.success) {
      yield put({
        type: GET_CHAT_CONTEXT_SUCCESS,
        payload: response.data,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_CHAT_CONTEXT_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_CHAT_CONTEXT_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getChatFeed(payload: IActionChatFeedRequested) {
  try {
    const [responseFeed, responseUserChatList]: [
      IActionChatFeedSuccess['payload'],
      IActionGetUserChatListSuccess['payload'],
    ] = yield all([call(ChatAPI.getChatFeed), call(ChatAPI.getUserChatList)]);

    // const response: IActionChatFeedSuccess['payload'] = yield call(ChatAPI.getChatFeed);
    if (responseFeed.success && responseUserChatList?.success) {
      yield put({
        type: GET_CHAT_FEED_SUCCESS,
        payload: responseFeed,
      });
      yield put({
        type: GET_USER_CHAT_LIST_SUCCESS,
        payload: responseUserChatList?.data,
      });
      payload?.callback && payload?.callback(responseFeed.data);
    } else {
      yield put({type: GET_CHAT_FEED_FAILURE, payload: {message: responseFeed}});
      payload?.callback && payload?.callback(responseFeed?.data);
    }
  } catch (error) {
    yield put({type: GET_CHAT_FEED_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getUserChatList(payload: IActionGetUserChatListRequested) {
  try {
    const response: IActionGetUserChatListSuccess['payload'] = yield call(ChatAPI.getUserChatList);
    if (response.success) {
      yield put({
        type: GET_USER_CHAT_LIST_SUCCESS,
        payload: response,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_USER_CHAT_LIST_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_USER_CHAT_LIST_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* onPin(payload: IActionOnPinRequested) {
  try {
    const chatState: IChatState = yield select(getChatState);
    const response: IActionOnPinSuccess['payload'] = yield call(ChatAPI.onPin, payload?.payload?.askId);
    if (response.success) {
      chatState.dataFeed.data[payload?.payload?.index].attributes.pinned = true;
      yield put({
        type: ON_PIN_SUCCESS,
        payload: chatState.dataFeed,
      });
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: ON_PIN_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: ON_PIN_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* onUnPin(payload: IActionOnUnPinRequested) {
  try {
    const chatState: IChatState = yield select(getChatState);
    const response: IActionOnUnPinSuccess['payload'] = yield call(ChatAPI.onUnPin, payload?.payload?.askId);
    if (response.success) {
      chatState.dataFeed.data[payload?.payload?.index].attributes.pinned = false;
      yield put({
        type: ON_UN_PIN_SUCCESS,
        payload: chatState.dataFeed,
      });
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: ON_UN_PIN_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: ON_UN_PIN_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* watchGetChatContext() {
  yield takeLatest(GET_CHAT_CONTEXT_REQUESTED, getChatContext);
}

function* watchGetChatFeed() {
  yield takeLatest(GET_CHAT_FEED_REQUESTED, getChatFeed);
}

function* watchOnPin() {
  yield takeLatest(ON_PIN_REQUESTED, onPin);
}

function* watchOnUnPin() {
  yield takeLatest(ON_UN_PIN_REQUESTED, onUnPin);
}

function* watchGetUserChatList() {
  yield takeLatest(GET_USER_CHAT_LIST_REQUESTED, getUserChatList);
}

export default function* chatWatchers() {
  yield all([watchGetChatContext(), watchGetChatFeed(), watchOnPin(), watchOnUnPin(), watchGetUserChatList()]);
}
