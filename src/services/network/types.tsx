import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_SUCCESS,
  REMOVE_NETWORK_CONNECTION_FAILURE,
} from './constants';

export interface INetworkConnectionListState {
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

export interface IActionNetworkConnectionListRequested {
  type: typeof GET_NETWORK_CONNECTION_LIST_REQUESTED;
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

export type IActionsUser =
  | IActionNetworkConnectionListRequested
  | IActionNetworkConnectionListSuccess
  | IActionNetworkConnectionListFailure
  | IActionRemoveNetworkConnectionRequested
  | IActionRemoveNetworkConnectionSuccess
  | IActionRemoveNetworkConnectionFailure;
