import {GET_CREDENTIAL_REQUESTED} from './constants';

export const getCredential = (callback: () => void) => {
  return {
    type: GET_CREDENTIAL_REQUESTED,
    callback,
  };
};
