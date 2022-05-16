import {
  DELETE_DATA_INDUSTRY,
  SET_USER_INDUSTRY,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  USER_INFO_REQUESTED,
} from './constants';
import {IActionUpdateUserInAppStatusRequested, IActionUpdateUserInAppStatusSuccess, IUserInfoState} from './types';

export const userInfoRequest = (callback?: (item: any) => void) => {
  return {
    type: USER_INFO_REQUESTED,
    callback,
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

export const updateUserInAppStatus = (
  payload: IActionUpdateUserInAppStatusRequested['payload'],
  callback: (response: IActionUpdateUserInAppStatusSuccess['payload']) => void,
) => {
  return {
    type: UPDATE_USER_IN_APP_STATUS_REQUESTED,
    payload,
    callback,
  };
};
