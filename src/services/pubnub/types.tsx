import {
  GET_CREDENTIAL_FAILURE,
  GET_CREDENTIAL_REQUESTED,
  GET_CREDENTIAL_SUCCESS,
  SET_PUBNUB_MESSAGE,
} from './constants';

export interface IPubNubState {
  loading: boolean;
  success: boolean;
  data: {
    uuid: string;
    publish_key: string;
    subscribe_key: string;
    token: string;
  };
  dataMessage: any;
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

export interface IActionSetPubnubMessage {
  type: typeof SET_PUBNUB_MESSAGE;
  payload: any;
}

export type IActionsPubnub =
  | IActionGetCredentialRequest
  | IActionGetCredentialSuccess
  | IActionGetCredentialFailure
  | IActionSetPubnubMessage;
