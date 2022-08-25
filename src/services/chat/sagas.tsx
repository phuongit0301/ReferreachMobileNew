import {all, call, delay, put, select, takeLatest} from 'redux-saga/effects';
import {IGlobalState} from '~Root/types';
import {IUserState} from '../user/types';

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
  GET_USER_CHAT_LIST_REQUESTED,
  GET_CHAT_PERSONAL_SUCCESS,
  GET_CHAT_PERSONAL_FAILURE,
  GET_CHAT_PERSONAL_REQUESTED,
  ON_CHAT_ONE_ON_ONE_REQUESTED,
  ON_CHAT_ONE_ON_ONE_SUCCESS,
  ON_CHAT_ONE_ON_ONE_FAILURE,
  ON_UPDATE_CHAT_CONTEXT_REQUESTED,
  ON_UPDATE_CHAT_CONTEXT_SUCCESS,
  ON_UPDATE_CHAT_CONTEXT_FAILURE,
  GET_CHAT_ASK_CONTEXT_REQUESTED,
  GET_CHAT_ASK_CONTEXT_FAILURE,
  GET_CHAT_ASK_CONTEXT_SUCCESS,
  GET_USER_CHAT_LIST_SEARCH_SUCCESS,
  GET_USER_CHAT_LIST_SEARCH_FAILURE,
} from './constants';
import {
  IActionChatAskContextRequested,
  IActionChatAskContextSuccess,
  IActionChatContextRequested,
  IActionChatContextSuccess,
  IActionChatFeedRequested,
  IActionChatFeedSuccess,
  IActionChatOneOnOneRequested,
  IActionChatOneOnOneSuccess,
  IActionChatPersonalRequested,
  IActionChatPersonalSuccess,
  IActionGetUserChatListRequested,
  IActionGetUserChatListSuccess,
  IActionOnPinRequested,
  IActionOnPinSuccess,
  IActionOnUnPinRequested,
  IActionOnUnPinSuccess,
  IActionOnUpdateChatContextRequested,
  IActionOnUpdateChatContextSuccess,
  IChatState,
  IIncluded,
  PinnableTypeEnum,
} from './types';

const getChatState = (state: IGlobalState) => state.chatState;
const getUserState = (state: IGlobalState) => state.userState;

function* getChatContext(payload: IActionChatContextRequested) {
  try {
    const response: IActionChatContextSuccess['payload'] = yield call(ChatAPI.getChatContext, payload?.payload);
    if (response.success) {
      const userState: IUserState = yield select(getUserState);
      const userReceive: IIncluded = yield call(ChatAPI.handleChatPersonalReceive, {
        arrUser: response.data?.included,
        currentUserId: userState?.userInfo?.id,
      });

      if (response?.data?.data?.attributes?.last_message_metadata) {
        const dataUpdate = {
          contextId: payload?.payload,
          lastMessage: {
            last_message_metadata: {
              ...response?.data?.data?.attributes?.last_message_metadata,
              read_by_user_id: userState?.userInfo?.id,
            },
          },
        };
        yield call(ChatAPI.onUpdateChatContext, dataUpdate);
      }

      yield put({
        type: GET_CHAT_CONTEXT_SUCCESS,
        payload: {...response.data, userReceive},
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

function* getChatAskContext(payload: IActionChatAskContextRequested) {
  try {
    const response: IActionChatAskContextSuccess['payload'] = yield call(ChatAPI.getChatContext, payload?.payload);
    if (response.success) {
      const userState: IUserState = yield select(getUserState);
      const userReceive: IIncluded = yield call(ChatAPI.handleUserReceive, {
        arrUser: response.data?.included,
        currentUserId: userState?.userInfo?.id,
      });

      if (response?.data?.data?.attributes?.last_message_metadata) {
        const dataUpdate = {
          contextId: payload?.payload,
          lastMessage: {
            last_message_metadata: {
              ...response?.data?.data?.attributes?.last_message_metadata,
              read_by_user_id: userState?.userInfo?.id,
            },
          },
        };
        yield call(ChatAPI.onUpdateChatContext, dataUpdate);
      }

      yield put({
        type: GET_CHAT_ASK_CONTEXT_SUCCESS,
        payload: {...response.data, ...userReceive, chatUuid: response?.data?.data?.attributes?.chat_uuid},
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_CHAT_ASK_CONTEXT_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_CHAT_ASK_CONTEXT_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* getChatPersonal(payload: IActionChatPersonalRequested) {
  try {
    const response: IActionChatPersonalSuccess['payload'] = yield call(ChatAPI.getChatPersonal, payload?.payload);
    if (response.success) {
      yield put({
        type: GET_CHAT_PERSONAL_SUCCESS,
        payload: response,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_CHAT_PERSONAL_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_CHAT_PERSONAL_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* onChatOneOnOne(payload: IActionChatOneOnOneRequested) {
  try {
    const response: IActionChatOneOnOneSuccess['payload'] = yield call(ChatAPI.onChatOneOnOne, payload?.payload);
    if (response.success) {
      const userState: IUserState = yield select(getUserState);
      const userReceive: IIncluded = yield call(ChatAPI.handleUserReceive, {
        arrUser: response.data?.included,
        currentUserId: userState?.userInfo?.id,
      });
      yield put({
        type: ON_CHAT_ONE_ON_ONE_SUCCESS,
        payload: {...response.data, userReceive},
      });
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: ON_CHAT_ONE_ON_ONE_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: ON_CHAT_ONE_ON_ONE_FAILURE, payload: {message: error}});
    payload?.callback &&
      payload?.callback({
        data: null,
        success: false,
        message: error,
      });
  }
}

function* onUpdateChatContext(payload: IActionOnUpdateChatContextRequested) {
  try {
    const response: IActionOnUpdateChatContextSuccess['payload'] = yield call(
      ChatAPI.onUpdateChatContext,
      payload?.payload,
    );
    if (response.success) {
      yield put({
        type: ON_UPDATE_CHAT_CONTEXT_SUCCESS,
        payload: response.data,
      });
      payload?.callback && payload?.callback(response);
    } else {
      yield put({type: ON_UPDATE_CHAT_CONTEXT_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response);
    }
  } catch (error) {
    yield put({type: ON_UPDATE_CHAT_CONTEXT_FAILURE, payload: {message: error}});
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
    yield delay(300);
    const [responseFeed, responseUserChatList]: [
      IActionChatFeedSuccess['payload'],
      IActionGetUserChatListSuccess['payload'],
    ] = yield all([call(ChatAPI.getChatFeed, payload?.payload), call(ChatAPI.getUserChatList)]);

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
    const response: IActionGetUserChatListSuccess['payload'] = yield call(ChatAPI.getUserChatList, payload?.payload);
    if (response.success) {
      yield put({
        type: GET_USER_CHAT_LIST_SEARCH_SUCCESS,
        payload: response?.data,
      });
      payload?.callback && payload?.callback(response.data);
    } else {
      yield put({type: GET_USER_CHAT_LIST_SEARCH_FAILURE, payload: {message: response}});
      payload?.callback && payload?.callback(response?.data);
    }
  } catch (error) {
    yield put({type: GET_USER_CHAT_LIST_SEARCH_FAILURE, payload: {message: error}});
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
    const response: IActionOnPinSuccess['payload'] = yield call(ChatAPI.onPin, payload?.payload);
    if (response.success) {
      if (payload?.payload?.pinnable_type === PinnableTypeEnum.ASK) {
        chatState.dataFeed.data[payload?.payload?.index].attributes.pinned = true;
        yield put({
          type: ON_PIN_SUCCESS,
          payload: {dataFeed: chatState.dataFeed},
        });
      } else {
        chatState.dataChatPersonal.data[payload?.payload?.index].attributes.pinned = true;
        yield put({
          type: ON_PIN_SUCCESS,
          payload: {dataChatPersonal: chatState.dataChatPersonal},
        });
      }
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
    const response: IActionOnUnPinSuccess['payload'] = yield call(ChatAPI.onUnPin, payload?.payload);
    if (response.success) {
      if (payload?.payload?.pinnable_type === PinnableTypeEnum.ASK) {
        chatState.dataFeed.data[payload?.payload?.index].attributes.pinned = false;
        yield put({
          type: ON_UN_PIN_SUCCESS,
          payload: chatState.dataFeed,
        });
      } else {
        chatState.dataChatPersonal.data[payload?.payload?.index].attributes.pinned = false;
        yield put({
          type: ON_UN_PIN_SUCCESS,
          payload: chatState.dataChatPersonal,
        });
      }
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

function* watchGetChatAskContext() {
  yield takeLatest(GET_CHAT_ASK_CONTEXT_REQUESTED, getChatAskContext);
}

function* watchGetChatPersonal() {
  yield takeLatest(GET_CHAT_PERSONAL_REQUESTED, getChatPersonal);
}

function* watchGetChatFeed() {
  yield takeLatest(GET_CHAT_FEED_REQUESTED, getChatFeed);
}

function* watchChatOneOnOne() {
  yield takeLatest(ON_CHAT_ONE_ON_ONE_REQUESTED, onChatOneOnOne);
}

function* watchUpdateChatContext() {
  yield takeLatest(ON_UPDATE_CHAT_CONTEXT_REQUESTED, onUpdateChatContext);
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
  yield all([
    watchGetChatContext(),
    watchGetChatAskContext(),
    watchGetChatFeed(),
    watchOnPin(),
    watchOnUnPin(),
    watchGetUserChatList(),
    watchGetChatPersonal(),
    watchChatOneOnOne(),
    watchUpdateChatContext(),
  ]);
}
