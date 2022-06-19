import {IPaginationAndSearch} from '~Root/services/ask/types';
import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_SUCCESS,
  REMOVE_NETWORK_CONNECTION_FAILURE,
  ON_INVITE_USER_FAILURE,
  ON_INVITE_USER_REQUESTED,
  ON_INVITE_USER_SUCCESS,
} from './constants';

export interface INetworkConnectionListState extends IPaginationAndSearch {
  message: string;
  loading: boolean;
  data: any;
  included: IIncluded[];
  callback: () => void;
}

export interface IAvatarMetadata {
  avatar_url: string;
  avatar_lat: string;
  avatar_lng: string;
}

export interface IIncluded {
  phone: any;
  id: string;
  type: string;
  attributes: {
    title: string;
    first_name?: string;
    last_name?: string;
    introductions: string;
    avatar_metadata: IAvatarMetadata;
    status: number; // 0: pending, 1: active
    phone?: string;
  };
}

export interface IInviteList {
  email: string;
  name: string;
  phone?: string;
}
export interface IInviteUser {
  contacts_list: IInviteList[];
}

export interface IActionNetworkConnectionListRequested {
  type: typeof GET_NETWORK_CONNECTION_LIST_REQUESTED;
  payload: string;
  callback?: any;
}
export interface IActionNetworkConnectionListSuccess {
  type: typeof GET_NETWORK_CONNECTION_LIST_SUCCESS;
  payload: {
    data: any[];
    included: IIncluded[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionNetworkConnectionListFailure {
  type: typeof GET_NETWORK_CONNECTION_LIST_FAILURE;
  payload: {
    data: any[] | [];
    included: IIncluded[] | [];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionRemoveNetworkConnectionRequested {
  type: typeof REMOVE_NETWORK_CONNECTION_REQUESTED;
  payload: string;
  callback?: (
    response: IActionRemoveNetworkConnectionSuccess['payload'] | IActionRemoveNetworkConnectionFailure['payload'],
  ) => void;
}
export interface IActionRemoveNetworkConnectionSuccess {
  type: typeof REMOVE_NETWORK_CONNECTION_SUCCESS;
  payload: {
    data: any[] | [];
    included: IIncluded[] | [];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionRemoveNetworkConnectionFailure {
  type: typeof REMOVE_NETWORK_CONNECTION_FAILURE;
  payload: {
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionInviteUserRequested {
  type: typeof ON_INVITE_USER_REQUESTED;
  payload: IInviteUser[];
  callback?: (response: IActionInviteUserSuccess['payload']) => void;
}
export interface IActionInviteUserSuccess {
  type: typeof ON_INVITE_USER_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionInviteUserFailure {
  type: typeof ON_INVITE_USER_FAILURE;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export type IActionsUser =
  | IActionNetworkConnectionListRequested
  | IActionNetworkConnectionListSuccess
  | IActionNetworkConnectionListFailure
  | IActionRemoveNetworkConnectionRequested
  | IActionRemoveNetworkConnectionSuccess
  | IActionRemoveNetworkConnectionFailure
  | IActionInviteUserRequested
  | IActionInviteUserSuccess
  | IActionInviteUserFailure;
