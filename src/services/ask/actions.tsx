import {GET_ASK_REQUESTED} from './constants';

export const getAsk = (callback: () => void) => {
  return {
    type: GET_ASK_REQUESTED,
    callback,
  };
};
