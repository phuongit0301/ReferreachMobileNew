import {LOGIN_REQUESTED, SET_DATA_LOGIN} from './constants';
import {IActionLoginRequested, IActionSetDataLogin} from './types';

export const loginRequest = (payload: IActionLoginRequested['payload'], callback: any) => {
  return {
    type: LOGIN_REQUESTED,
    payload,
    callback,
  };
};

export const setDataLogin = (payload: IActionSetDataLogin['payload'], callback: () => void) => {
  return {
    type: SET_DATA_LOGIN,
    payload,
    callback,
  };
};
