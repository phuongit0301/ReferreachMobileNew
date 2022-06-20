import {GET_NETWORK_CONNECTION_LIST_REQUESTED, REMOVE_NETWORK_CONNECTION_REQUESTED} from './constants';
import {IActionRemoveNetworkConnectionSuccess} from './types';

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
