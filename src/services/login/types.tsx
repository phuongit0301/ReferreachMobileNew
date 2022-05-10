import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './constants';

export interface ILoginState {
  message: string;
  loading: boolean;
  email: string;
  password: string;
  callback?: any;
}
export interface IActionLoginRequested {
  type: typeof LOGIN_REQUESTED;
  payload: {
    email: string;
    password: string;
  };
  callback?: (response: any) => void;
}
export interface IActionLoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    data: {
      id: number;
      email: string;
      created_at: Date;
      updated_at: Date;
      avatar?: string;
      title?: string;
      first_name?: string;
      last_name?: string;
      introductions?: string;
    };
    message: string;
    success: boolean;
  };
  callback?: () => void;
}
export interface IActionLoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
  callback?: () => void;
}

export type IActionsLogin = IActionLoginRequested | IActionLoginSuccess | IActionLoginFailure;
