import {ILoadingState} from '~Root/services/loading/types';
import {ILoginState} from '~Root/services/login/types';
import {IAuthState} from '~Root/services/auth/types';
import {IUserState} from '~Root/services/user/types';

// Global state
export interface IGlobalState {
  loadingState: ILoadingState;
  loginState: ILoginState;
  authState: IAuthState;
  userState: IUserState;
}

// Interface for async call steps
export interface IAsyncCall {
  REQUESTED: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface ISetAsyncCall {
  SET: string;
}

export interface IOnAsyncCall {
  ON: string;
}
export interface IModalAsyncCall {
  SHOW: string;
  HIDE: string;
}

export interface IWaitingAsyncCall {
  SHOW: string;
  HIDE: string;
}
