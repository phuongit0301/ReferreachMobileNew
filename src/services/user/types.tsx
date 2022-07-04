import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {IIndustry, IIndustrySave} from '../industry/types';
import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  UPDATE_USER_IN_APP_STATUS_SUCCESS,
  UPDATE_USER_IN_APP_STATUS_FAILURE,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR_REQUESTED,
  UPDATE_USER_AVATAR_SUCCESS,
} from './constants';

export interface IAvatarMetaData {
  avatar_url?: string;
  avatar_lat?: number | null;
  avatar_lng?: number | null;
}

export interface IAvatar {
  avatar?: string;
  avatar_lat?: number;
  avatar_lng?: number;
}

export interface IUserInfoState {
  id?: number;
  email: string;
  title: string | null;
  first_name: string;
  last_name: string;
  pitch: string | null;
  created_at: string | null;
  updated_at: string | null;
  onboard_completed: boolean;
  confirmed_at: string | null;
  in_app_status: IN_APP_STATUS_ENUM;
  avatar?: string;
  self_industries: IIndustry[] | IIndustrySave[];
  partner_industries: IIndustry[] | IIndustrySave[];
  sell_industries: IIndustry[] | IIndustrySave[];
  avatar_metadata: IAvatarMetaData;
}

export interface IUserUpdateState {
  first_name: string;
  last_name: string;
  title: string;
  pitch: string;
  self_industry_list: string[];
  partner_industry_list: string[];
  sell_industry_list: string[];
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

export interface IActionUpdateUserProfileRequested {
  type: typeof UPDATE_USER_PROFILE_REQUESTED;
  payload: IUserUpdateState;
  callback?: (response: IActionUpdateUserProfileSuccess['payload']) => void;
}

export interface IActionUpdateUserProfileSuccess {
  type: typeof UPDATE_USER_PROFILE_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionUpdateUserProfileFailure {
  type: typeof UPDATE_USER_PROFILE_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionUpdateUserAvatarRequested {
  type: typeof UPDATE_USER_AVATAR_REQUESTED;
  payload: IAvatar;
  callback?: (response: IActionUpdateUserAvatarSuccess['payload']) => void;
}

export interface IActionUpdateUserAvatarSuccess {
  type: typeof UPDATE_USER_AVATAR_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionUpdateUserAvatarFailure {
  type: typeof UPDATE_USER_AVATAR_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export type IActionsUser =
  | IActionUserInfoRequested
  | IActionUserInfoSuccess
  | IActionUserInfoFailure
  | IActionSetUserIndustry
  | IActionDeleteUserIndustry
  | IActionUpdateUserInAppStatusRequested
  | IActionUpdateUserInAppStatusSuccess
  | IActionUpdateUserInAppStatusFailure
  | IActionUpdateUserProfileRequested
  | IActionUpdateUserProfileSuccess
  | IActionUpdateUserProfileFailure
  | IActionUpdateUserAvatarRequested
  | IActionUpdateUserAvatarSuccess
  | IActionUpdateUserAvatarFailure;
