import {GET_CREDENTIAL_REQUESTED, SET_PUBNUB_MESSAGE} from './constants';

export const getCredential = (callback: () => void) => {
  return {
    type: GET_CREDENTIAL_REQUESTED,
    callback,
  };
};

export const setPubnubMessage = (payload: any) => {
  return {
    type: SET_PUBNUB_MESSAGE,
    payload,
  };
};
