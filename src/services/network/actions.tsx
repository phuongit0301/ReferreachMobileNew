import {
  GET_MASS_INVITATION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  ON_CREATE_MASS_INVITATION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  SET_MASS_INVITATION,
} from './constants';
import {IActionCreateMassInvitationRequested, IActionRemoveNetworkConnectionSuccess} from './types';

export const getNetworkConnectList = (payload: string, callback: any) => {
  return {
    type: GET_NETWORK_CONNECTION_LIST_REQUESTED,
    payload,
    callback,
  };
};

export const removeNetworkConnect = (
  payload: string,
  callback: (response: IActionRemoveNetworkConnectionSuccess['payload']) => void,
) => {
  return {
    type: REMOVE_NETWORK_CONNECTION_REQUESTED,
    payload,
    callback,
  };
};

export const getMassInvitationListRequest = (callback: any) => {
  return {
    type: GET_MASS_INVITATION_LIST_REQUESTED,
    callback,
  };
};

export const setMassInvitation = (payload: any) => {
  return {
    type: SET_MASS_INVITATION,
    payload,
  };
};

export const createMassInvitationRequest = (
  payload: IActionCreateMassInvitationRequested['payload'],
  callback: any,
) => {
  return {
    type: ON_CREATE_MASS_INVITATION_REQUESTED,
    payload,
    callback,
  };
};
