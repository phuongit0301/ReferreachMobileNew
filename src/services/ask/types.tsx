import {
  GET_ASK_REQUESTED,
  GET_ASK_SUCCESS,
  GET_ASK_FAILURE,
  GET_LOCATION_REQUESTED,
  GET_JOB_FAILURE,
  GET_JOB_REQUESTED,
  GET_JOB_SUCCESS,
  GET_LOCATION_FAILURE,
  GET_LOCATION_SUCCESS,
  SET_DATA_CREATE_ASK,
  SET_DATA_CREATE_ASK_STEP_1,
  SET_DATA_CREATE_ASK_STEP_2,
  SET_DATA_CREATE_ASK_STEP_3,
  SET_LOCATION,
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
} from './constants';

export interface IAskState {
  message: string;
  data: IActionListAskState;
  dataGreetingSuggest?: string[];
  dataPositionDropDown: any[];
  dataPositionSuggest?: any[];
  dataLocationSuggest?: any[];
  loading: boolean;
  success: boolean;
  textSearch?: string;
  callback: (item?: any) => void;
  dataStep1: any | null;
  dataStep2: any | null;
  dataStep3: any | null;
}

export interface IAttributesState {
  greeting: string;
  demographic: string;
  business_requirement: string;
  business_detail: string;
  deadline: Date;
  additional_detail: string;
  created_at: Date;
  updated_at: Date;
  status: string;
  edited: boolean;
}

export interface ICriteriumDataState {
  id: string;
  ask_id: string;
  text: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICriteriumState {
  data: ICriteriumDataState[];
}

export interface IDocumentDataState {
  id: string;
  type: string;
}

export interface IDocumentState {
  data: ICriteriumDataState[];
}

export interface IAskLocationDataState {
  id: string;
  ask_id: string;
  text: string;
  ref_service: string | null;
  ref_value: string | null;
  created_at: Date;
  updated_at: Date;
}
export interface IAskLocationState {
  data: IAskLocationDataState;
}

export interface IRelationshipsState {
  criterium: ICriteriumState;
  documents: IDocumentState;
  ask_location: IAskLocationState;
}

export interface IAskInside {
  id: string;
  type: string;
  attributes: IAttributesState;
  relationships: IRelationshipsState;
}

export interface IFiles {
  id: string;
  type: string;
  attributes: {
    file_url: string;
    content_type: string; // application/pdf, application/vnd.ms-excel
  };
}

export interface IActionListAskState {
  data: IAskInside[];
  included?: IFiles[];
}

export interface IActionGetAskRequest {
  type: typeof GET_ASK_REQUESTED;
  callback: (response: IActionGetAskSuccess['payload']) => void;
}
export interface IActionGetAskSuccess {
  type: typeof GET_ASK_SUCCESS;
  payload: {
    data: IActionListAskState;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetAskFailure {
  type: typeof GET_ASK_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionCreateAskRequest {
  type: typeof CREATE_ASK_REQUESTED;
  payload: any;
  callback: (response: IActionCreateAskSuccess['payload']) => void;
}
export interface IActionCreateAskSuccess {
  type: typeof CREATE_ASK_SUCCESS;
  payload: {
    data: IActionListAskState;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionCreateAskFailure {
  type: typeof CREATE_ASK_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionGetJobRequest {
  type: typeof GET_JOB_REQUESTED;
  payload: string;
  callback: (response: IActionGetJobSuccess['payload']) => void;
}
export interface IActionGetJobSuccess {
  type: typeof GET_JOB_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetJobFailure {
  type: typeof GET_JOB_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionGetLocationRequest {
  type: typeof GET_LOCATION_REQUESTED;
  payload: string;
  callback: (response: IActionGetLocationSuccess['payload']) => void;
}
export interface IActionGetLocationSuccess {
  type: typeof GET_LOCATION_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetLocationFailure {
  type: typeof GET_LOCATION_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionSetDataCreateAskStep1 {
  type: typeof SET_DATA_CREATE_ASK_STEP_1;
  payload: any;
  callback: () => void;
}
export interface IActionSetDataCreateAskStep2 {
  type: typeof SET_DATA_CREATE_ASK_STEP_2;
  payload: any;
  callback: () => void;
}
export interface IActionSetDataCreateAskStep3 {
  type: typeof SET_DATA_CREATE_ASK_STEP_3;
  payload: any;
  callback: () => void;
}

export interface IActionSetLocation {
  type: typeof SET_LOCATION;
  payload: any;
}

export type IActionsCreateAsk =
  | IActionGetAskRequest
  | IActionGetAskSuccess
  | IActionGetAskFailure
  | IActionCreateAskRequest
  | IActionCreateAskSuccess
  | IActionCreateAskFailure
  | IActionGetJobRequest
  | IActionGetJobSuccess
  | IActionGetJobFailure
  | IActionGetLocationRequest
  | IActionGetLocationSuccess
  | IActionGetLocationFailure
  | IActionSetDataCreateAskStep1
  | IActionSetDataCreateAskStep2
  | IActionSetDataCreateAskStep3
  | IActionSetLocation;
