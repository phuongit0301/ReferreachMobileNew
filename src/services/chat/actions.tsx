import {
  GET_CHAT_ASK_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_PERSONAL_REQUESTED,
  ON_CHAT_ONE_ON_ONE_REQUESTED,
  ON_PIN_REQUESTED,
  ON_UN_PIN_REQUESTED,
  ON_UPDATE_CHAT_CONTEXT_REQUESTED,
  SET_CHAT_VISIBLE_MENU,
} from './constants';
import {
  IActionChatOneOnOneRequested,
  IActionChatOneOnOneSuccess,
  IActionOnPinSuccess,
  IActionOnUnPinSuccess,
  IActionOnUpdateChatContextRequested,
  IActionOnUpdateChatContextSuccess,
} from './types';

export const getChatFeedRequest = (callback: () => void) => {
  return {
    type: GET_CHAT_FEED_REQUESTED,
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

export const getChatAskContextRequest = (payload: any, callback: () => void) => {
  return {
    type: GET_CHAT_ASK_CONTEXT_REQUESTED,
    payload,
    callback,
  };
};

export const getChatPersonalRequest = (payload: any, callback: () => void) => {
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
  payload: {askId: string; index: number},
  callback: (response: IActionOnPinSuccess['payload']) => void,
) => {
  return {
    type: ON_PIN_REQUESTED,
    payload,
    callback,
  };
};

export const onUnPinRequest = (
  payload: {askId: string; index: number},
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
