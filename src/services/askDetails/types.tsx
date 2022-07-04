import {
  IAskInside,
  IAskLocationDataState,
  ICriteriumDataState,
  IFiles,
  IRelationshipsState,
} from '~Root/services/ask/types';
import {IIncluded} from '~Root/services/network/types';
import {
  GET_ASK_DETAILS_REQUESTED,
  GET_ASK_DETAILS_SUCCESS,
  GET_ASK_DETAILS_FAILURE,
  SET_ASK_DETAILS,
} from './constants';
export interface IAskDetailsState {
  message: string;
  loading: boolean;
  dataDetails: {
    data: IData | null;
    included: IAskIncluded[];
  };
  dataNetwork: {
    data: IDataSuggest[];
    included: IIncluded[];
  };
  page: number;
  callback: () => void;
}

export interface IAskIncluded {
  id: string;
  type: string;
  attributes: IAttributesState;
  relationships: IRelationshipsState;
}

export interface IAttributesState {
  email: string;
  title: string;
  first_name: string;
  last_name: string;
  pitch: string;
  created_at: Date;
  updated_at: Date;
  onboard_completed: boolean;
  confirmed_at: Date | null;
  in_app_status: string;
  avatar_metadata?: IAvatarMetadata;
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
    greeting: string;
    demographic: string;
    business_requirement: string;
    user_role: string;
    deadline: Date;
    additional_detail: string;
    business_detail: string;
    location: string;
    documents: IFiles[];
    criterium: ICriteriumDataState[];
    ask_location: IAskLocationDataState;
    created_at: Date;
    updated_at: Date;
    status: string;
    edited: boolean;
    open_edit: boolean;
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

export interface IActionGetAskDetailsRequested {
  type: typeof GET_ASK_DETAILS_REQUESTED;
  payload: number;
  callback?: any;
}
export interface IActionGetAskDetailsSuccess {
  type: typeof GET_ASK_DETAILS_SUCCESS;
  payload: {
    data: IData[];
    included: IAskInside[];
    meta: IMeta;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionGetAskDetailsFailure {
  type: typeof GET_ASK_DETAILS_FAILURE;
  payload: {
    data: IData[] | [];
    included: IAskInside[] | [];
    IMeta: IMeta | null;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface setAskDetails {
  type: typeof SET_ASK_DETAILS;
}

export type IActionsUser =
  | IActionGetAskDetailsRequested
  | IActionGetAskDetailsSuccess
  | IActionGetAskDetailsFailure
  | setAskDetails;
