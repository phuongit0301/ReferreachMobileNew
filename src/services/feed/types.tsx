import {IAskInside} from '~Root/services/ask/types';
import {IIncluded} from '~Root/services/network/types';
import {IUserInfoState} from '~Root/services/user/types';
import {
  GET_FEED_ITEMS_LIST_REQUESTED,
  GET_FEED_ITEMS_LIST_SUCCESS,
  GET_FEED_ITEMS_LIST_FAILURE,
  GET_FEED_ITEM_PAGINATION_FAILURE,
  GET_FEED_ITEM_PAGINATION_REQUESTED,
  GET_FEED_ITEM_PAGINATION_SUCCESS,
  SET_FEED_ITEM_READ_REQUESTED,
  SET_FEED_ITEM_READ_SUCCESS,
  SET_FEED_ITEM_READ_FAILURE,
} from './constants';
export interface IFeedItemsState {
  message: string;
  loading: boolean;
  dataFeed: {
    data: IData[];
    included: IAskInside[];
    meta: IMeta | null;
  };
  dataNetwork: {
    data: IDataSuggest[];
    included: IIncluded[];
  };
  page: number;
  callback: () => void;
}

export interface IAvatarMetadata {
  avatar_url: string;
  avatar_lat: string;
  avatar_lng: string;
}

export interface IData {
  id: string;
  type: string;
  attributes: {
    ask_id: number;
    user_id: number;
    read_at?: string;
    user: IUserInfoState;
  };
  relationships: {
    ask: {
      data: {
        id: number;
        type: string;
      };
    };
  };
}

export interface IDataSuggest {
  id: string;
  type: string;
  attributes: {
    status: string;
  };
  relationships: {
    connected_user: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface IMeta {
  page: number;
  total_pages: number;
  total_count: number;
}

export interface IActionFeedItemsListRequested {
  type: typeof GET_FEED_ITEMS_LIST_REQUESTED;
  payload: number;
  callback?: any;
}
export interface IActionFeedItemsListSuccess {
  type: typeof GET_FEED_ITEMS_LIST_SUCCESS;
  payload: {
    data: IData[];
    included: IAskInside[];
    meta: IMeta;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionFeedItemsListFailure {
  type: typeof GET_FEED_ITEMS_LIST_FAILURE;
  payload: {
    data: IData[] | [];
    included: IAskInside[] | [];
    IMeta: IMeta | null;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionFeedItemPaginationRequested {
  type: typeof GET_FEED_ITEM_PAGINATION_REQUESTED;
  payload: number;
  callback?: any;
}
export interface IActionFeedItemPaginationSuccess {
  type: typeof GET_FEED_ITEM_PAGINATION_SUCCESS;
  payload: {
    data: IData[];
    included: IAskInside[];
    meta: IMeta;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionFeedItemPaginationFailure {
  type: typeof GET_FEED_ITEM_PAGINATION_FAILURE;
  payload: {
    data: IData[] | [];
    included: IAskInside[] | [];
    IMeta: IMeta | null;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionSetFeedItemReadRequested {
  type: typeof SET_FEED_ITEM_READ_REQUESTED;
  payload: number;
  callback?: any;
}
export interface IActionSetFeedItemReadSuccess {
  type: typeof SET_FEED_ITEM_READ_SUCCESS;
  payload: {
    data: IData[];
    included: IAskInside[];
    meta: IMeta;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionSetFeedItemReadFailure {
  type: typeof SET_FEED_ITEM_READ_FAILURE;
  payload: {
    data: IData[] | [];
    included: IAskInside[] | [];
    IMeta: IMeta | null;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export type IActionsUser =
  | IActionFeedItemsListRequested
  | IActionFeedItemsListSuccess
  | IActionFeedItemsListFailure
  | IActionFeedItemPaginationRequested
  | IActionFeedItemPaginationSuccess
  | IActionFeedItemPaginationFailure
  | IActionSetFeedItemReadRequested
  | IActionSetFeedItemReadSuccess
  | IActionSetFeedItemReadFailure;
