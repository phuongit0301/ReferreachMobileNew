import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  UPDATE_USER_IN_APP_STATUS_SUCCESS,
  UPDATE_USER_IN_APP_STATUS_FAILURE,
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
  email: string;
  title: string | null;
  first_name: string;
  last_name: string;
  introductions: string | null;
  created_at: string | null;
  updated_at: string | null;
  onboard_completed: boolean;
  confirmed_at: string | null;
  in_app_status: IN_APP_STATUS_ENUM;

  self_industries: string[];
  partner_industries: string[];
  sell_industries: string[];
}

export interface IUserState {
  error: string;
  loading: boolean;
  userInfo: IUserInfoState;
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

export interface IActionUpdateUserInAppStatusRequested {
  type: typeof UPDATE_USER_IN_APP_STATUS_REQUESTED;
  payload: {
    in_app_status: IN_APP_STATUS_ENUM;
  };
  callback?: (response: IActionUpdateUserInAppStatusSuccess['payload']) => void;
}
export interface IActionUpdateUserInAppStatusSuccess {
  type: typeof UPDATE_USER_IN_APP_STATUS_SUCCESS;
  payload: {
    data: IUserInfoState | null;
    success: boolean;
    message: string;
  };
  callback?: (response: IActionUpdateUserInAppStatusSuccess['payload']) => void;
}
export interface IActionUpdateUserInAppStatusFailure {
  type: typeof UPDATE_USER_IN_APP_STATUS_FAILURE;
  payload: {
    data: IUserInfoState | null;
    success: boolean;
    message: string;
  };
  callback?: (response: IActionUpdateUserInAppStatusFailure['payload']) => void;
}

export interface IActionSetUserIndustry {
  type: typeof SET_USER_INDUSTRY;
  payload: any;
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
  | IActionDeleteUserIndustry
  | IActionUpdateUserInAppStatusRequested
  | IActionUpdateUserInAppStatusSuccess
  | IActionUpdateUserInAppStatusFailure;
