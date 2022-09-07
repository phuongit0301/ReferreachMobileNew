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
  GET_PUBLIC_PROFILE_REQUESTED,
  GET_PUBLIC_PROFILE_FAILURE,
  GET_PUBLIC_PROFILE_SUCCESS,
  SET_FEED_INTRODUCTIONS,
  CREATE_INTRODUCTION_REQUESTED,
  CREATE_INTRODUCTION_FAILURE,
  GET_SUGGEST_INTRODUCTION_LIST_FAILURE,
  GET_SUGGEST_INTRODUCTION_LIST_SUCCESS,
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
  dataNetworkOriginal: {
    data: [],
    included: [],
  },
  page: 1,
  dataSelected: null,
  dataUser: {
    data: null,
    included: [],
    meta: null,
  },
  dataProfileRefer: {
    data: null,
    included: null,
    meta: null,
  },
  visibleMenu: {
    show: false,
    coordinate: {
      top: 0,
      left: 0,
    },
  },
  networkPer: 10,
  networkPage: 1,
  networkTextSearch: '',
  callback: () => {},
};

const userReducer = (state: IFeedItemsState = initialState, action: IActionsUser): IFeedItemsState => {
  switch (action.type) {
    case GET_FEED_ITEMS_LIST_REQUESTED:
    case SET_FEED_ITEM_READ_REQUESTED:
    case GET_PUBLIC_PROFILE_REQUESTED:
    case CREATE_INTRODUCTION_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_FEED_ITEM_PAGINATION_REQUESTED:
      return {...state, callback: action?.callback, page: action?.payload, loading: true};
    case GET_PUBLIC_PROFILE_SUCCESS:
      return {
        ...state,
        dataUser: {
          ...state?.dataUser,
          data: action?.payload?.data,
          included: action?.payload?.included,
          meta: action?.payload?.meta,
        },
        loading: true,
      };
    case GET_FEED_ITEMS_LIST_SUCCESS:
    case GET_FEED_ITEM_PAGINATION_SUCCESS:
    case GET_SUGGEST_INTRODUCTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action?.payload,
        message: action?.payload?.message,
      };
    case GET_FEED_ITEMS_LIST_FAILURE:
    case GET_FEED_ITEM_PAGINATION_FAILURE:
    case SET_FEED_ITEM_READ_FAILURE:
    case GET_PUBLIC_PROFILE_FAILURE:
    case CREATE_INTRODUCTION_FAILURE:
    case GET_SUGGEST_INTRODUCTION_LIST_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case SET_FEED_VISIBLE_MENU:
      return {...state, ...action?.payload};
    case SET_FEED_INTRODUCTIONS:
      return {...state, dataProfileRefer: action?.payload};
    default:
      return state;
  }
};

export default userReducer;
