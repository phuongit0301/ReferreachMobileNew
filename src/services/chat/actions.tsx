import {
  GET_CHAT_ASK_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_PERSONAL_REQUESTED,
  GET_USER_CHAT_LIST_REQUESTED,
  ON_CHAT_ONE_ON_ONE_REQUESTED,
  ON_PIN_REQUESTED,
  ON_UN_PIN_REQUESTED,
  ON_UPDATE_CHAT_CONTEXT_REQUESTED,
  RESET_DATA_CHAT,
  SET_CHAT_VISIBLE_MENU,
  SET_USER_CHAT_LIST,
} from './constants';
import {
  IActionChatOneOnOneRequested,
  IActionChatOneOnOneSuccess,
  IActionOnPinSuccess,
  IActionOnUnPinSuccess,
  IActionOnUpdateChatContextRequested,
  IActionOnUpdateChatContextSuccess,
  IChatAskContext,
  IPaginationAndSearch,
  IPersonalPaginationAndSearch,
  PinnableTypeEnum,
} from './types';

export const getUserChatListRequested = (payload: string, callback: () => void) => {
  return {
    type: GET_USER_CHAT_LIST_REQUESTED,
    payload,
    callback,
  };
};

export const setUserChatList = () => {
  return {
    type: SET_USER_CHAT_LIST,
  };
};

export const getChatFeedRequest = (payload: IPaginationAndSearch, callback: () => void) => {
  return {
    type: GET_CHAT_FEED_REQUESTED,
    payload,
    callback,
  };
};

export const getChatContextRequest = (payload: any, callback: () => void) => {
  return {
    type: GET_CHAT_CONTEXT_REQUESTED,
    payload,
    callback,
  };
};

export const getChatAskContextRequest = (payload: IChatAskContext, callback: () => void) => {
  return {
    type: GET_CHAT_ASK_CONTEXT_REQUESTED,
    payload,
    callback,
  };
};

export const getChatPersonalRequest = (payload: IPersonalPaginationAndSearch, callback: () => void) => {
  return {
    type: GET_CHAT_PERSONAL_REQUESTED,
    payload,
    callback,
  };
};

export const onChatOneOnOneRequest = (
  payload: IActionChatOneOnOneRequested['payload'],
  callback: (response: IActionChatOneOnOneSuccess['payload']) => void,
) => {
  return {
    type: ON_CHAT_ONE_ON_ONE_REQUESTED,
    payload,
    callback,
  };
};

export const onUpdateChatContextRequest = (
  payload: IActionOnUpdateChatContextRequested['payload'],
  callback: (response: IActionOnUpdateChatContextSuccess['payload']) => void,
) => {
  return {
    type: ON_UPDATE_CHAT_CONTEXT_REQUESTED,
    payload,
    callback,
  };
};

export const onPinRequest = (
  payload: {pinnable_id: string; pinnable_type: PinnableTypeEnum; index: number},
  callback: (response: IActionOnPinSuccess['payload']) => void,
) => {
  return {
    type: ON_PIN_REQUESTED,
    payload,
    callback,
  };
};

export const onUnPinRequest = (
  payload: {pinnable_id: string; pinnable_type: PinnableTypeEnum; index: number},
  callback: (response: IActionOnUnPinSuccess['payload']) => void,
) => {
  return {
    type: ON_UN_PIN_REQUESTED,
    payload,
    callback,
  };
};

export const setVisibleMenu = (payload: any, callback?: () => void) => {
  return {
    type: SET_CHAT_VISIBLE_MENU,
    payload,
    callback,
  };
};

export const resetDataChat = () => {
  return {
    type: RESET_DATA_CHAT,
  };
};
