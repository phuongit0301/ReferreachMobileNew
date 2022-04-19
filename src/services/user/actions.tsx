import {
  SET_DATA_USER_INFO,
  USER_INFO_REQUESTED,
  UPDATE_USER_PROFILE_REQUESTED,
  ON_CHANGE_RESPONDER,
  ON_CHANGE_INTRODUCER,
  ON_REVOKE_INVITE,
  SET_USER_PROFILE,
  SET_USER_PROFILE_REFER,
  SET_USER_PROFILE_AVATAR,
  SET_USER_PROFILE_TEMP,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  GET_ASK_RESPONDER_REQUESTED,
  GET_ASK_INTRODUCER_REQUESTED,
  GET_TAG_REQUESTED,
  FILTER_DATA_TAG,
  SET_TAG_SELECTED,
  DELETE_TAG,
  CLEAR_FEEDBACK,
} from './constants';
import {IActionSetDataUserInfo, IAvatar, IProfileNew, IUserInfoState} from './types';

export const userInfoRequest = (callback?: (item: any) => void) => {
  return {
    type: USER_INFO_REQUESTED,
    callback,
  };
};

export const updateUserProfileRequest = (payload: any, callback: (item: any) => void) => {
  return {
    type: UPDATE_USER_PROFILE_REQUESTED,
    payload,
    callback,
  };
};

export const setDataUserInfo = (payload: IActionSetDataUserInfo['payload']) => {
  return {
    type: SET_DATA_USER_INFO,
    payload,
  };
};

export const onChangeReponder = (payload: string, callback?: () => void) => {
  return {
    type: ON_CHANGE_RESPONDER,
    payload,
    callback,
  };
};

export const onChangeIntroducer = (payload: string, callback?: () => void) => {
  return {
    type: ON_CHANGE_INTRODUCER,
    payload,
    callback,
  };
};

export const onRevokeInvite = (payload: any) => {
  return {
    type: ON_REVOKE_INVITE,
    payload,
  };
};

export const setUserProfile = (payload: any) => {
  return {
    type: SET_USER_PROFILE,
    payload,
  };
};

export const setUserProfileRefer = (payload: any) => {
  return {
    type: SET_USER_PROFILE_REFER,
    payload,
  };
};

export const setUserProfileAvatar = (payload: IAvatar) => {
  return {
    type: SET_USER_PROFILE_AVATAR,
    payload,
  };
};

export const setUserProfileTemp = (payload: IProfileNew) => {
  return {
    type: SET_USER_PROFILE_TEMP,
    payload,
  };
};

export const setUserIndustry = (payload: IUserInfoState) => {
  return {
    type: SET_USER_INDUSTRY,
    payload,
  };
};

export const deleteUserIndustry = (payload: {index: number; target: string}) => {
  return {
    type: DELETE_DATA_INDUSTRY,
    payload,
  };
};

export const getAskResponderRequest = (callback?: (item: any) => void) => {
  return {
    type: GET_ASK_RESPONDER_REQUESTED,
    callback,
  };
};

export const getAskIntroducerRequest = (callback?: (item: any) => void) => {
  return {
    type: GET_ASK_INTRODUCER_REQUESTED,
    callback,
  };
};

export const getTagRequest = (callback?: (item: any) => void) => {
  return {
    type: GET_TAG_REQUESTED,
    callback,
  };
};

export const filterTag = (payload: string) => {
  return {
    type: FILTER_DATA_TAG,
    payload,
  };
};

export const setTagSelected = (payload: any) => {
  return {
    type: SET_TAG_SELECTED,
    payload,
  };
};

export const deleteTag = ({index, tagType}: {index: number; tagType: number}) => {
  return {
    type: DELETE_TAG,
    payload: {index, tagType},
  };
};

export const clearFeedback = () => {
  return {type: CLEAR_FEEDBACK};
};
