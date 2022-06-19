import {GET_ASK_DETAILS_REQUESTED, SET_ASK_DETAILS} from './constants';
import {IActionGetAskDetailsSuccess} from './types';

export const getAskDetails = (
  payload: number,
  callback: (response: IActionGetAskDetailsSuccess['payload']) => void,
) => {
  return {
    type: GET_ASK_DETAILS_REQUESTED,
    payload,
    callback,
  };
};

export const setAskDetails = () => {
  return {
    type: SET_ASK_DETAILS,
  };
};
