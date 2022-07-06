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
  SET_FEED_VISIBLE_MENU,
  GET_PUBLIC_PROFILE_FAILURE,
  GET_PUBLIC_PROFILE_REQUESTED,
  GET_PUBLIC_PROFILE_SUCCESS,
  SET_FEED_INTRODUCTIONS,
  CREATE_INTRODUCTION_FAILURE,
  CREATE_INTRODUCTION_REQUESTED,
  CREATE_INTRODUCTION_SUCCESS,
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
  dataSelected: any;
  dataUser: {
    data: IPublicProfile | null;
    included: IProfileIncluded[];
    meta: IMeta | null;
  };
  dataProfileRefer: {
    data: IDataSuggest[] | null;
    included: IIncluded[] | null;
    meta: IMeta | null;
  } | null;
  page: number;
  visibleMenu: {
    show: boolean;
    coordinate: {
      top: number;
      left: number;
    };
  };
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

export interface IProfileIncluded {
  id: string;
  type: string;
  attributes: {
    name: string;
  };
}
export interface IIndustry {
  id: string;
  type: string;
}
export interface IPublicProfile {
  id: string;
  type: string;
  attributes: {
    title: string;
    first_name: string;
    last_name: string;
    full_name: string;
    pitch: string;
    avatar_metadata: {
      avatar_url: string;
      avatar_lat: string;
      avatar_lng: string;
    };
  };
  relationships: {
    self_industries: {
      data: IIndustry[];
    };
    partner_industries: {
      data: IIndustry[];
    };
    sell_industries: {
      data: IIndustry[];
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
  page?: number;
  total_pages?: number;
  total_count?: number;
  network_connection_id: string | null;
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

export interface IActionSetFeedVisibleMenu {
  type: typeof SET_FEED_VISIBLE_MENU;
  payload: any;
  callback: () => void;
}

export interface IActionSetFeedIntroductions {
  type: typeof SET_FEED_INTRODUCTIONS;
  payload: any;
}

export interface IActionGetPublicProfileRequested {
  type: typeof GET_PUBLIC_PROFILE_REQUESTED;
  payload: number;
  callback?: any;
}
export interface IActionGetPublicProfileSuccess {
  type: typeof GET_PUBLIC_PROFILE_SUCCESS;
  payload: {
    data: IPublicProfile | null;
    included: IProfileIncluded[];
    meta: IMeta;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionGetPublicProfileFailure {
  type: typeof GET_PUBLIC_PROFILE_FAILURE;
  payload: {
    data: IPublicProfile | null;
    included: IProfileIncluded[];
    IMeta: IMeta | null;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionCreateIntroductionRequested {
  type: typeof CREATE_INTRODUCTION_REQUESTED;
  payload: {
    message_for_asker: string;
    message_for_introducee: string;
    ask_id: number;
    introducee_id: string;
  };
  callback?: any;
}
export interface IActionCreateIntroductionSuccess {
  type: typeof CREATE_INTRODUCTION_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionCreateIntroductionFailure {
  type: typeof CREATE_INTRODUCTION_FAILURE;
  payload: {
    data: IPublicProfile | null;
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
  | IActionSetFeedItemReadFailure
  | IActionSetFeedVisibleMenu
  | IActionGetPublicProfileRequested
  | IActionGetPublicProfileSuccess
  | IActionGetPublicProfileFailure
  | IActionSetFeedIntroductions
  | IActionCreateIntroductionRequested
  | IActionCreateIntroductionSuccess
  | IActionCreateIntroductionFailure;
