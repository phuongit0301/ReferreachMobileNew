import {GET_ASK_REQUESTED, GET_ASK_SUCCESS, GET_ASK_FAILURE} from './constants';

export interface IAskState {
  errors: string;
  data: any;
  dataGreetingSuggest?: string[];
  dataPositionDropDown: any[];
  dataPositionSuggest?: string[];
  loading: boolean;
  success: boolean;
  textSearch?: string;
  callback: (item?: any) => void;
}

export interface IActionGetAskRequest {
  type: typeof GET_ASK_REQUESTED;
  callback: () => void;
}
export interface IActionGetAskSuccess {
  type: typeof GET_ASK_SUCCESS;
  payload: any;
  callback: () => void;
}

export interface IActionGetAskFailure {
  type: typeof GET_ASK_FAILURE;
  payload: {
    error: string;
  };
}
export type IActionsCreateAsk = IActionGetAskRequest | IActionGetAskSuccess | IActionGetAskFailure;
