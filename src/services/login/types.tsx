import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE, SET_DATA_LOGIN} from './constants';

export interface ILoginState {
  errors: any;
  loading: boolean;
  email: string;
  password: string;
  access_token: string;
  active: boolean;
  callback?: any;
}
export interface IActionLoginRequested {
  type: typeof LOGIN_REQUESTED;
  payload: {
    email: string;
    password: string;
    grant_type?: string;
  };
  callback?: any;
}
export interface IActionLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    data: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
      active: boolean;
    };
    message: string;
    success: boolean;
  };
  callback?: any;
}
export interface IActionLoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}

export interface IActionSetDataLogin {
  type: typeof SET_DATA_LOGIN;
  payload: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    active: boolean;
  };
  callback: () => void;
}
export interface IFormData {
  email: string;
  password: string;
}
export type IActionsLogin = IActionLoginRequested | IActionLoginSuccess | IActionLoginFailure | IActionSetDataLogin;
