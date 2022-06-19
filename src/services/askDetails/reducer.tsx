import {GET_ASK_DETAILS_REQUESTED, GET_ASK_DETAILS_SUCCESS, GET_ASK_DETAILS_FAILURE, SET_ASK_DETAILS} from './constants';
import {IAskDetailsState, IActionsUser} from './types';

export const initialState: IAskDetailsState = {
  message: '',
  loading: false,
  dataDetails: {
    data: null,
    included: [],
  },
  dataNetwork: {
    data: [],
    included: [],
  },
  page: 1,
  callback: () => {},
};

const askDetailsReducer = (state: IAskDetailsState = initialState, action: IActionsUser): IAskDetailsState => {
  switch (action.type) {
    case GET_ASK_DETAILS_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_ASK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action?.payload,
        message: action?.payload?.message,
      };
    case SET_ASK_DETAILS:
      return {
        ...state,
        dataDetails: {
          data: null,
          included: [],
        },
        dataNetwork: {
          data: [],
          included: [],
        },
      };
    case GET_ASK_DETAILS_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
};

export default askDetailsReducer;
