import {
  CLEAR_PROGRESS,
  COUNT_DOWN_REQUESTED,
  INITIALIZE_AUTH_FAILURE,
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  LOGOUT,
  SET_PROGRESS,
} from './constants';
import {IActionInitializeAuthFailure, IActionSetProgress} from './types';

export const initAuth = () => {
  return {type: INITIALIZE_AUTH_REQUESTED};
};

export const initAuthSuccess = () => {
  return {
    type: INITIALIZE_AUTH_SUCCESS,
  };
};

export const initAuthFailure = (payload: IActionInitializeAuthFailure['payload']) => {
  return {
    type: INITIALIZE_AUTH_FAILURE,
    payload,
  };
};

export const logout = () => {
  return {type: LOGOUT};
};

export const countDownRequest = () => ({
  type: COUNT_DOWN_REQUESTED,
});

export const onSetProgress = (payload: IActionSetProgress['payload']) => {
  return {type: SET_PROGRESS, payload};
};

export const onClearProgress = (payload: IActionSetProgress['payload']) => {
  return {type: CLEAR_PROGRESS, payload};
};
