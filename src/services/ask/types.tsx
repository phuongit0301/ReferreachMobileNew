import {IAvatarMetadata} from '../network/types';
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
  SET_DATA_CREATE_ASK_STEP_1,
  SET_DATA_CREATE_ASK_STEP_2,
  SET_DATA_CREATE_ASK_STEP_3,
  SET_LOCATION,
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
  GET_ASK_EDIT_FAILURE,
  GET_ASK_EDIT_REQUESTED,
  GET_ASK_EDIT_SUCCESS,
  UPDATE_ASK_FAILURE,
  UPDATE_ASK_REQUESTED,
  UPDATE_ASK_SUCCESS,
  SET_VISIBLE_MENU,
} from './constants';

export interface IPaginationAndSearch {
  page?: number;
  per?: number;
  keyword?: string;
}
export interface IAskState extends IPaginationAndSearch {
  message: string;
  data: IAskInside[];
  dataGreetingSuggest?: string[];
  dataPositionDropDown: any[];
  dataPositionSuggest?: any[];
  dataLocationSuggest?: any[];
  dataAskCreated: IAskInside | null;
  loading: boolean;
  success: boolean;
  textSearch?: string;
  callback: (item?: any) => void;
  dataStep1: any | null;
  dataStep2: any | null;
  dataStep3: any | null;
  dataDetails: IAskInside | null;
  dataAskSelected: IAskInside | null;
  visibleMenu: {
    show: boolean;
    coordinate: {
      top: number;
      left: number;
    };
  };
}

export interface IAttributesState {
  greeting: string;
  user_role: string;
  demographic: string;
  business_requirement: string;
  business_detail: string;
  deadline: Date;
  additional_detail: string;
  location: string;
  criteria1?: string;
  criteria2?: string;
  criteria3?: string;
  criteria4?: string;
  criteria5?: string;
  documents: IFiles[];
  criterium: ICriteriumDataState[];
  ask_location: IAskLocationDataState;
  avatar_metadata?: IAvatarMetadata;
  created_at: Date;
  updated_at: Date;
  status: string;
  edited: boolean;
}

export interface ICriteriumDataState {
  id: string;
  ask_id: string;
  text: string;
  deleted?: boolean;
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
  id?: string;
  content_type: string;
  file_url: string;
}

export interface IActionListAskState {
  data: IAskInside[];
}

export interface IActionCreateAskState {
  data: IAskInside;
}

export interface IActionGetAskRequest {
  type: typeof GET_ASK_REQUESTED;
  payload: IPaginationAndSearch;
  callback: (response: IActionGetAskSuccess['payload']) => void;
}
export interface IActionGetAskSuccess {
  type: typeof GET_ASK_SUCCESS;
  payload: {
    data: IAskInside[];
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

export interface IActionGetAskDetailsRequest {
  type: typeof GET_ASK_EDIT_REQUESTED;
  payload: number;
  callback: (response: IActionGetAskDetailsSuccess['payload']) => void;
}
export interface IActionGetAskDetailsSuccess {
  type: typeof GET_ASK_EDIT_SUCCESS;
  payload: {
    data: IAskInside | null;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetAskDetailsFailure {
  type: typeof GET_ASK_EDIT_FAILURE;
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
    data: IAskInside;
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

export interface IActionUpdateAskRequest {
  type: typeof UPDATE_ASK_REQUESTED;
  payload: {
    id: number;
    formData: any;
    formDataRemove: Array<
      | {
          'documents_attributes[][id]': number;
          'documents_attributes[][_destroy]': boolean;
        }
      | {
          'criterium_attributes[][id]': number;
          'criterium_attributes[][_destroy]': boolean;
        }
    >;
  };
  callback: (response: IActionUpdateAskSuccess['payload']) => void;
}
export interface IActionUpdateAskSuccess {
  type: typeof UPDATE_ASK_SUCCESS;
  payload: {
    data: IAskInside;
    message: string;
    success: boolean;
    isExpired: boolean;
  };
  callback: () => void;
}

export interface IActionUpdateAskFailure {
  type: typeof UPDATE_ASK_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
    isExpired: boolean;
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

export interface IActionSetVisibleMenu {
  type: typeof SET_VISIBLE_MENU;
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
  | IActionGetAskDetailsRequest
  | IActionGetAskDetailsSuccess
  | IActionGetAskDetailsFailure
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
  | IActionSetLocation
  | IActionSetVisibleMenu
  | IActionUpdateAskRequest
  | IActionUpdateAskSuccess
  | IActionUpdateAskFailure;
