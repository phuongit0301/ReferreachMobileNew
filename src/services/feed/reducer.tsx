import {
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEMS_LIST_SUCCESS,
  GET_FEED_ITEMS_LIST_FAILURE,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  GET_FEED_ITEM_PAGINATION_SUCCESS,
  GET_FEED_ITEM_PAGINATION_FAILURE,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_ITEM_READ_FAILURE,
  SET_FEED_VISIBLE_MENU,
} from './constants';
import {IFeedItemsState, IActionsUser} from './types';

export const initialState: IFeedItemsState = {
  message: '',
  loading: false,
  dataFeed: {
    data: [],
    included: [],
    meta: null,
  },
  dataNetwork: {
    data: [],
    included: [],
  },
  page: 1,
  dataSelected: null,
  visibleMenu: {
    show: false,
    coordinate: {
      top: 0,
      left: 0,
    },
  },
  callback: () => {},
};

const userReducer = (state: IFeedItemsState = initialState, action: IActionsUser): IFeedItemsState => {
  switch (action.type) {
    case GET_FEED_ITEMS_LIST_REQUESTED:
    case SET_FEED_ITEM_READ_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_FEED_ITEM_PAGINATION_REQUESTED:
      return {...state, callback: action?.callback, page: action?.payload, loading: true};
    case GET_FEED_ITEMS_LIST_SUCCESS:
    case GET_FEED_ITEM_PAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action?.payload,
        message: action?.payload?.message,
      };
    case GET_FEED_ITEMS_LIST_FAILURE:
    case GET_FEED_ITEM_PAGINATION_FAILURE:
    case SET_FEED_ITEM_READ_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case SET_FEED_VISIBLE_MENU:
      return {...state, ...action?.payload};
    default:
      return state;
  }
};

export default userReducer;
