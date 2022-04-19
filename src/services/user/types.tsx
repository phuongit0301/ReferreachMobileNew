import {CountryCode} from 'react-native-country-picker-modal';

import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_DATA_USER_INFO,
  ON_REVOKE_INVITE,
  SET_USER_PROFILE,
  SET_USER_PROFILE_REFER,
  SET_USER_PROFILE_AVATAR,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  SET_USER_PROFILE_TEMP,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  GET_ASK_RESPONDER_FAILURE,
  GET_ASK_RESPONDER_REQUESTED,
  GET_ASK_RESPONDER_SUCCESS,
  GET_ASK_INTRODUCER_FAILURE,
  GET_ASK_INTRODUCER_REQUESTED,
  GET_ASK_INTRODUCER_SUCCESS,
  GET_TAG_FAILURE,
  GET_TAG_REQUESTED,
  GET_TAG_SUCCESS,
  FILTER_DATA_TAG,
  SET_TAG_SELECTED,
  DELETE_TAG,
  ON_CHANGE_INTRODUCER,
  ON_CHANGE_RESPONDER,
  CLEAR_FEEDBACK,
} from './constants';

export interface IMyAskDefault {
  purpose_of_ask?: string | '';
  a_provider_of?: string | '';
  from_company?: string | '';
  to_talk_about?: string | '';
  looking_for?: string | '';
  based_in?: string | '';
  within_next?: string | '';
}

export interface IMyAsk extends IMyAskDefault {
  id?: string | undefined;
  public_link_id?: string;
  other_info?: string | null;
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
  sell_to?: ISellTo[];
  partners?: IPartners[];
}
export interface IProfileNew {
  first_name?: string;
  last_name?: string;
  title?: string;
  introduction?: string;
  industries?: {
    myself: string[];
    client: string[];
    partner: string[];
  };
}

export interface ITrustNetWorkMySelf {
  company_name?: string;
  company_role?: string;
}
export interface ITrustNetwork {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  country_code?: CountryCode | undefined;
  calling_code?: string;
  myself?: ITrustNetWorkMySelf;
  profile_photo?: string;
  status: number; // 0:pending, 1: active
  date_invite?: Date;
}

export interface IMyPartner {
  industry: any[];
}
export interface IMyClient {
  industry: any[];
}
export interface IMySelf {
  industry: any[];
  biztype: string;
  self_intro: string;
}
export interface IIndustries {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IResponder {
  id: string;
  name: string;
  avatar?: string;
}
export interface IIntroducer {
  id: string;
  name: string;
  avatar: string;
}
export interface ITags {
  id?: string;
  name: string;
}
export interface IAvatar {
  name?: string;
  type?: string;
  uri?: string;
}

export interface IUserInfoState {
  id?: number;
  user_id?: number;
  first_name: string;
  last_name: string;
  title?: string;
  introduction?: string;
  industries: {
    myself: string[] | any[];
    client: string[] | any[];
    partner: string[] | any[];
  };
  industriesUpdate?: {
    myself: string[];
    client: string[];
    partner: string[];
  };
  network_reach: number;
  trust_network: ITrustNetwork[];
  invites_left: number;
  invoke_invite: ITrustNetwork | null;
  my_ask: any[];
  my_ask_selected: any | null;
  responder_tags: ITags[];
  responder: IResponder[];
  responder_selected?: string;
  introducer?: IIntroducer[];
  introducer_selected?: string;
  introducer_tags: ITags[];
  tags: string[];
  tag_responder_selected: string[];
  tag_introducer_selected: string[];
  tag_original: string[];
  avatar?: {
    url?: string;
  };
  profile_completed: boolean;
}
export interface IUserState {
  errors: any;
  loading: boolean;
  userInfo: IUserInfoState;
  profile: any | null;
  profile_refer: any | null;
  userRefer: {
    data: any[] | null;
    textSearch: string;
  };
  avatar_temp?: IAvatar | null;
  profile_temp?: IProfileNew | null;
  callback?: () => void;
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
    data: IUserInfoState;
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

export interface IActionSetDataUserInfo {
  type: typeof SET_DATA_USER_INFO;
  payload: {
    data: any;
  };
}

export interface IActionOnRevokeInvite {
  type: typeof ON_REVOKE_INVITE;
  payload: ITrustNetwork;
}

export interface IActionSetUserProfile {
  type: typeof SET_USER_PROFILE;
  payload: any;
}

export interface IActionSetUserProfileRefer {
  type: typeof SET_USER_PROFILE_REFER;
  payload: any;
}

export interface IActionSetUserProfileAvatar {
  type: typeof SET_USER_PROFILE_AVATAR;
  payload: IAvatar;
}

export interface IActionSetUserProfileTemp {
  type: typeof SET_USER_PROFILE_TEMP;
  payload: IProfileNew;
}

export interface IActionUpdateUserProfileRequested {
  type: typeof UPDATE_USER_PROFILE_REQUESTED;
  payload: any;
  callback?: () => void;
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

export interface IActionGetAskResponderRequested {
  type: typeof GET_ASK_RESPONDER_REQUESTED;
  callback?: () => void;
}

export interface IActionGetAskResponderSuccess {
  type: typeof GET_ASK_RESPONDER_SUCCESS;
  payload: {
    data: any;
    responder_selected: string;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionGetAskResponderFailure {
  type: typeof GET_ASK_RESPONDER_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionGetAskIntroducerRequested {
  type: typeof GET_ASK_INTRODUCER_REQUESTED;
  callback?: () => void;
}

export interface IActionGetAskIntroducerSuccess {
  type: typeof GET_ASK_INTRODUCER_SUCCESS;
  payload: {
    data: any;
    introducer_selected: string;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionGetAskIntroducerFailure {
  type: typeof GET_ASK_INTRODUCER_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionGetTagRequested {
  type: typeof GET_TAG_REQUESTED;
  callback?: () => void;
}

export interface IActionGetTagSuccess {
  type: typeof GET_TAG_SUCCESS;
  payload: {
    data: string[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionGetTagFailure {
  type: typeof GET_TAG_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionSetUserIndustry {
  type: typeof SET_USER_INDUSTRY;
  payload: IUserInfoState['industries'];
}
export interface IActionSetTagsSelected {
  type: typeof SET_TAG_SELECTED;
  payload: string[];
}

export interface IActionDeleteUserIndustry {
  type: typeof DELETE_DATA_INDUSTRY;
  payload: {
    index: number;
    target: string;
  };
}

export interface IActionFilterTag {
  type: typeof FILTER_DATA_TAG;
  payload: string;
}

export interface IActionDeleteTag {
  type: typeof DELETE_TAG;
  payload: {
    index: number;
    tagType: number;
  };
}

export interface IActionChangeResponder {
  type: typeof ON_CHANGE_RESPONDER;
  payload: string;
}
export interface IActionChangeIntroducer {
  type: typeof ON_CHANGE_INTRODUCER;
  payload: string;
}

export interface IActionClearFeedback {
  type: typeof CLEAR_FEEDBACK;
}

export type IActionsUser =
  | IActionUserInfoRequested
  | IActionUserInfoSuccess
  | IActionUserInfoFailure
  | IActionSetDataUserInfo
  | IActionOnRevokeInvite
  | IActionSetUserProfile
  | IActionSetUserProfileRefer
  | IActionSetUserProfileAvatar
  | IActionSetUserProfileTemp
  | IActionUpdateUserProfileRequested
  | IActionUpdateUserProfileSuccess
  | IActionUpdateUserProfileFailure
  | IActionSetUserIndustry
  | IActionDeleteUserIndustry
  | IActionGetAskIntroducerRequested
  | IActionGetAskIntroducerSuccess
  | IActionGetAskIntroducerFailure
  | IActionGetAskResponderRequested
  | IActionGetAskResponderSuccess
  | IActionGetAskResponderFailure
  | IActionGetTagRequested
  | IActionGetTagSuccess
  | IActionGetTagFailure
  | IActionFilterTag
  | IActionSetTagsSelected
  | IActionDeleteTag
  | IActionChangeResponder
  | IActionChangeIntroducer
  | IActionClearFeedback;
