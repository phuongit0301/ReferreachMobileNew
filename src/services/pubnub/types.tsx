import {GET_CREDENTIAL_FAILURE, GET_CREDENTIAL_REQUESTED, GET_CREDENTIAL_SUCCESS} from './constants';

export interface IPubNubState {
  loading: boolean;
  success: boolean;
  data: {
    uuid: string;
    publish_key: string;
    subscribe_key: string;
    token: string;
  };
  message: string;
  callback: (response: any) => void;
}

export interface IActionGetCredentialRequest {
  type: typeof GET_CREDENTIAL_REQUESTED;
  callback: (response: IActionGetCredentialSuccess['payload']) => void;
}
export interface IActionGetCredentialSuccess {
  type: typeof GET_CREDENTIAL_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetCredentialFailure {
  type: typeof GET_CREDENTIAL_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export type IActionsPubnub = IActionGetCredentialRequest | IActionGetCredentialSuccess | IActionGetCredentialFailure;
