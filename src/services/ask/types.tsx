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
  ON_UPDATE_EXTEND_DEADLINE_SUCCESS,
  ON_UPDATE_EXTEND_DEADLINE_FAILURE,
  ON_UPDATE_EXTEND_DEADLINE_REQUESTED,
  ON_END_ASK_FAILURE,
  ON_END_ASK_REQUESTED,
  ON_END_ASK_SUCCESS,
  GET_ASK_RESPONDER_REQUESTED,
  GET_ASK_RESPONDER_SUCCESS,
  GET_ASK_RESPONDER_FAILURE,
  ON_SEND_KUDOS_FAILURE,
  ON_SEND_KUDOS_REQUESTED,
  ON_SEND_KUDOS_SUCCESS,
} from './constants';

export interface IPaginationAndSearch {
  page?: number;
  per?: number;
  keyword?: string;
}

export interface IData {
  id: string;
  type: string;
  attributes: {
    introducer_ids: [number];
  };
  relationships: {
    introducer: {
      data: {
        id: string;
        type: string;
      };
    };
    introducee: {
      data: {
        id: string;
        type: string;
      };
    };
  };
  introducee: IIncluded | null;
  introducers: IIncluded[];
}

export interface IIncluded {
  id: string;
  type: string;
  attributes: {
    title: string;
    first_name: string;
    last_name: string;
    pitch: string;
    avatar_metadata: {
      avatar_url: string;
      avatar_lat: string;
      avatar_lng: string;
    };
    pubnub_uuid: string;
  };
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
  dataResponder: {
    data: IData[];
    included: IIncluded[];
  };
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
  deadline_change_count: number;
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

export interface IActionGetAskResponderRequest {
  type: typeof GET_ASK_RESPONDER_REQUESTED;
  payload: string;
  callback: (response: IActionGetAskResponderSuccess['payload'] | IActionGetAskResponderFailure['payload']) => void;
}
export interface IActionGetAskResponderSuccess {
  type: typeof GET_ASK_RESPONDER_SUCCESS;
  payload: {
    data: IAskState['dataResponder'];
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionGetAskResponderFailure {
  type: typeof GET_ASK_RESPONDER_FAILURE;
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

export interface IExtendDeadlineInterface {
  askId: string;
  deadline: string;
}

export interface IActionOnUpdateExtendDeadlineRequest {
  type: typeof ON_UPDATE_EXTEND_DEADLINE_REQUESTED;
  payload: IExtendDeadlineInterface;
  callback: (response: IActionOnUpdateExtendDeadlineSuccess['payload']) => void;
}
export interface IActionOnUpdateExtendDeadlineSuccess {
  type: typeof ON_UPDATE_EXTEND_DEADLINE_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionOnUpdateExtendDeadlineFailure {
  type: typeof ON_UPDATE_EXTEND_DEADLINE_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionOnEndAskRequest {
  type: typeof ON_END_ASK_REQUESTED;
  payload: string;
  callback: (response: IActionOnEndAskSuccess['payload']) => void;
}
export interface IActionOnEndAskSuccess {
  type: typeof ON_END_ASK_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionOnEndAskFailure {
  type: typeof ON_END_ASK_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export interface IActionOnSendKudosRequest {
  type: typeof ON_SEND_KUDOS_REQUESTED;
  payload: {
    askId: string;
    params: {
      rating: number;
      responder_id?: string;
    };
  };
  callback: (response: IActionOnSendKudosSuccess['payload']) => void;
}
export interface IActionOnSendKudosSuccess {
  type: typeof ON_SEND_KUDOS_SUCCESS;
  payload: {
    data?: any;
    message: string;
    success: boolean;
  };
  callback: () => void;
}

export interface IActionOnSendKudosFailure {
  type: typeof ON_SEND_KUDOS_FAILURE;
  payload: {
    data: null;
    message: string;
    success: boolean;
  };
}

export type IActionsCreateAsk =
  | IActionGetAskRequest
  | IActionGetAskSuccess
  | IActionGetAskFailure
  | IActionGetAskResponderRequest
  | IActionGetAskResponderSuccess
  | IActionGetAskResponderFailure
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
  | IActionUpdateAskFailure
  | IActionOnUpdateExtendDeadlineRequest
  | IActionOnUpdateExtendDeadlineSuccess
  | IActionOnUpdateExtendDeadlineFailure
  | IActionOnEndAskRequest
  | IActionOnEndAskSuccess
  | IActionOnEndAskFailure
  | IActionOnSendKudosRequest
  | IActionOnSendKudosSuccess
  | IActionOnSendKudosFailure;
