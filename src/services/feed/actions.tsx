import {
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  GET_PUBLIC_PROFILE_REQUESTED,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_VISIBLE_MENU,
} from './constants';
import {IActionFeedItemPaginationSuccess, IActionFeedItemsListSuccess, IActionSetFeedItemReadSuccess} from './types';

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
