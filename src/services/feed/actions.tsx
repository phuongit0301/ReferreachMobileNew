import {
  CREATE_INTRODUCTION_REQUESTED,
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  GET_PUBLIC_PROFILE_REQUESTED,
  SET_FEED_INTRODUCTIONS,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_VISIBLE_MENU,
} from './constants';
import {
  IActionCreateIntroductionRequested,
  IActionCreateIntroductionSuccess,
  IActionFeedItemPaginationSuccess,
  IActionFeedItemsListSuccess,
  IActionSetFeedItemReadSuccess,
  IFeedItemsState,
} from './types';

export const getFeedItemsList = (
  payload: number,
  callback: (response: IActionFeedItemsListSuccess['payload']) => void,
) => {
  return {
    type: GET_FEED_ITEMS_LIST_REQUESTED,
    payload,
    callback,
  };
};

export const getFeedItemPagination = (
  payload: number,
  callback: (response: IActionFeedItemPaginationSuccess['payload']) => void,
) => {
  return {
    type: GET_FEED_ITEM_PAGINATION_REQUESTED,
    payload,
    callback,
  };
};

export const setFeedItemRead = (
  payload: number,
  callback: (response: IActionSetFeedItemReadSuccess['payload']) => void,
) => {
  return {
    type: SET_FEED_ITEM_READ_REQUESTED,
    payload,
    callback,
  };
};

export const setVisibleMenu = (payload: any, callback?: () => void) => {
  return {
    type: SET_FEED_VISIBLE_MENU,
    payload,
    callback,
  };
};

export const getPublicProfile = (payload: number, callback?: () => void) => {
  return {
    type: GET_PUBLIC_PROFILE_REQUESTED,
    payload,
    callback,
  };
};

export const setFeedIntroductions = (payload: IFeedItemsState['dataNetwork']) => {
  return {
    type: SET_FEED_INTRODUCTIONS,
    payload,
  };
};

export const createIntroduction = (
  payload: IActionCreateIntroductionRequested['payload'],
  callback?: (response: IActionCreateIntroductionSuccess['payload']) => void,
) => {
  return {
    type: CREATE_INTRODUCTION_REQUESTED,
    payload,
    callback,
  };
};
