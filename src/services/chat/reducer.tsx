import {
  GET_CHAT_CONTEXT_FAILURE,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_SUCCESS,
  GET_CHAT_FEED_FAILURE,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_FEED_SUCCESS,
  GET_USER_CHAT_LIST_SUCCESS,
  ON_PIN_FAILURE,
  ON_PIN_REQUESTED,
  ON_PIN_SUCCESS,
  ON_UN_PIN_FAILURE,
  ON_UN_PIN_REQUESTED,
  ON_UN_PIN_SUCCESS,
  SET_CHAT_VISIBLE_MENU,
} from './constants';
import {IActionsChat, IChatState} from './types';

export const initialState: IChatState = {
  message: '',
  loading: false,
  success: false,
  listMatches: [],
  dataFeed: {
    data: [],
    included: [],
  },
  dataChat: null,
  callback: () => {},
};

const chatReducer = (state: IChatState = initialState, action: IActionsChat): IChatState => {
  switch (action.type) {
    case GET_CHAT_CONTEXT_REQUESTED:
    case GET_CHAT_FEED_REQUESTED:
    case ON_PIN_REQUESTED:
    case ON_UN_PIN_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_CHAT_FEED_SUCCESS:
      return {...state, loading: false, dataFeed: action.payload?.data};
    case GET_CHAT_CONTEXT_SUCCESS:
      return {...state, loading: false, dataChat: action.payload};
    case GET_USER_CHAT_LIST_SUCCESS:
      return {...state, loading: false, listMatches: action.payload?.data};
    case ON_PIN_SUCCESS:
    case ON_UN_PIN_SUCCESS:
      return {...state, dataFeed: {...state.dataFeed, data: [...action?.payload?.data]}};
    case GET_CHAT_CONTEXT_FAILURE:
    case GET_CHAT_FEED_FAILURE:
    case ON_PIN_FAILURE:
    case ON_UN_PIN_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case SET_CHAT_VISIBLE_MENU:
      return {...state, ...action?.payload};
    default:
      return state;
  }
};

export default chatReducer;
