import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
} from './constants';

export interface IMySelf {
  id: string;
  name: string;
}
export interface ISellTo {
  id: string;
  name: string;
}
export interface IPartners {
  id: string;
  name: string;
}
export interface IProfile {
  name?: string;
  title?: string;
  description?: string;
  myself: IMySelf[];
  sell_to?: ISellTo[];
  partners?: IPartners[];
}

export interface IUserInfoState {
  id?: number;
  industries: {
    myself: string[];
    client: string[];
    partner: string[];
  };
  industriesUpdate?: {
    myself: string[];
    client: string[];
    partner: string[];
  };
  profile_completed: boolean;
}

export interface IUserState {
  error: string;
  loading: boolean;
  userInfo: any;
  callback: () => void;
}
export interface IActionUserInfoRequested {
  type: typeof USER_INFO_REQUESTED;
  payload: {
    token: string;
  };
  callback?: any;
}
export interface IActionUserInfoSuccess {
  type: typeof USER_INFO_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: any;
}
export interface IActionUserInfoFailure {
  type: typeof USER_INFO_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}

export interface IActionSetUserIndustry {
  type: typeof SET_USER_INDUSTRY;
  payload: IUserInfoState['industries'];
}

export interface IActionDeleteUserIndustry {
  type: typeof DELETE_DATA_INDUSTRY;
  payload: {
    index: number;
    target: string;
  };
}

export type IActionsUser =
  | IActionUserInfoRequested
  | IActionUserInfoSuccess
  | IActionUserInfoFailure
  | IActionSetUserIndustry
  | IActionDeleteUserIndustry;
