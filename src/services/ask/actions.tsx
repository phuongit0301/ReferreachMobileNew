import {
  GET_ASK_REQUESTED,
  GET_JOB_REQUESTED,
  GET_LOCATION_REQUESTED,
  SET_DATA_CREATE_ASK_STEP_1,
  SET_DATA_CREATE_ASK_STEP_2,
  SET_DATA_CREATE_ASK_STEP_3,
  SET_LOCATION,
  CREATE_ASK_REQUESTED,
  GET_ASK_DETAILS_REQUESTED,
  UPDATE_ASK_REQUESTED,
  SET_VISIBLE_MENU,
} from './constants';
import {IActionGetAskDetailsFailure, IActionGetAskDetailsSuccess, IActionUpdateAskSuccess} from './types';

export const getAsk = (callback: () => void) => {
  return {
    type: GET_ASK_REQUESTED,
    callback,
  };
};

export const getAskDetails = (
  payload: number,
  callback: (response: IActionGetAskDetailsSuccess['payload'] | IActionGetAskDetailsFailure['payload']) => void,
) => {
  return {
    type: GET_ASK_DETAILS_REQUESTED,
    payload,
    callback,
  };
};

export const getJob = (payload: string, callback: () => void) => {
  return {
    type: GET_JOB_REQUESTED,
    payload,
    callback,
  };
};

export const getLocation = (payload: string, callback: () => void) => {
  return {
    type: GET_LOCATION_REQUESTED,
    payload,
    callback,
  };
};

export const createAsk = (payload: any, callback: () => void) => {
  return {
    type: CREATE_ASK_REQUESTED,
    payload,
    callback,
  };
};

export const updateAsk = (payload: any, callback: (response: IActionUpdateAskSuccess['payload']) => void) => {
  return {
    type: UPDATE_ASK_REQUESTED,
    payload,
    callback,
  };
};

export const setLocation = (payload: string | null) => {
  return {
    type: SET_LOCATION,
    payload,
  };
};

export const setDataCreateAsk1 = (payload: any, callback?: () => void) => {
  return {
    type: SET_DATA_CREATE_ASK_STEP_1,
    payload,
    callback,
  };
};
export const setDataCreateAsk2 = (payload: any, callback?: () => void) => {
  return {
    type: SET_DATA_CREATE_ASK_STEP_2,
    payload,
    callback,
  };
};

export const setDataCreateAsk3 = (payload: any, callback?: () => void) => {
  return {
    type: SET_DATA_CREATE_ASK_STEP_3,
    payload,
    callback,
  };
};

export const setVisibleMenu = (payload: any, callback?: () => void) => {
  return {
    type: SET_VISIBLE_MENU,
    payload,
    callback,
  };
};
