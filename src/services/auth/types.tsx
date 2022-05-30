import {
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  INITIALIZE_AUTH_FAILURE,
  COUNT_DOWN_REQUESTED,
  COUNT_DOWN_SUCCESS,
  COUNT_DOWN_FAILURE,
  SET_PROGRESS,
  CLEAR_PROGRESS,
  LOGOUT,
} from './constants';

// Notes state
export interface IAuthState {
  error: any;
  loading: boolean;
  isAppReady: boolean;
  isLoggedIn: boolean;
  token: string;
  progress: number;
}

export interface IVerifyToken {
  success: boolean;
  payload?: string | null;
}

// Procedures actions
export interface IActionInitializeAuthRequested {
  type: typeof INITIALIZE_AUTH_REQUESTED;
  payload: any;
}
export interface IActionInitializeAuthSuccess {
  type: typeof INITIALIZE_AUTH_SUCCESS;
  payload: {
    token: string;
  };
}
export interface IActionInitializeAuthFailure {
  type: typeof INITIALIZE_AUTH_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionCountDownRequested {
  type: typeof COUNT_DOWN_REQUESTED;
}
export interface IActionCountDownSuccess {
  type: typeof COUNT_DOWN_SUCCESS;
  payload: {
    token: string;
  };
}
export interface IActionCountDownFailure {
  type: typeof COUNT_DOWN_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionSetProgress {
  type: typeof SET_PROGRESS;
  payload: {
    progress: number;
  };
}
export interface IActionLogout {
  type: typeof LOGOUT;
  callback: () => void;
}

export interface IActionClearProgress {
  type: typeof CLEAR_PROGRESS;
  payload: {
    progress: number;
  };
}

export type IActionsAuth =
  | IActionInitializeAuthRequested
  | IActionInitializeAuthSuccess
  | IActionInitializeAuthFailure
  | IActionCountDownRequested
  | IActionCountDownSuccess
  | IActionCountDownFailure
  | IActionSetProgress
  | IActionClearProgress
  | IActionLogout;
