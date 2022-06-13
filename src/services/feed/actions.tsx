import {GET_FEED_ITEMS_LIST_REQUESTED, GET_FEED_ITEM_PAGINATION_REQUESTED} from './constants';
import {IActionFeedItemPaginationSuccess, IActionFeedItemsListSuccess} from './types';

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
