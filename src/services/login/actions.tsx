import {FORGOT_PASSWORD_REQUESTED, LOGIN_REQUESTED} from './constants';
import {IActionForgotPasswordRequested, IActionLoginRequested} from './types';

export const loginRequest = (payload: IActionLoginRequested['payload'], callback: any) => {
  return {
    type: LOGIN_REQUESTED,
    payload,
    callback,
  };
};

export const forgotPasswordRequest = (payload: IActionForgotPasswordRequested['payload'], callback: any) => {
  return {
    type: FORGOT_PASSWORD_REQUESTED,
    payload,
    callback,
  };
};
