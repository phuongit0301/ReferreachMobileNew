import {
  GET_CHAT_ASK_CONTEXT_FAILURE,
  GET_CHAT_ASK_CONTEXT_REQUESTED,
  GET_CHAT_ASK_CONTEXT_SUCCESS,
  GET_CHAT_CONTEXT_FAILURE,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_SUCCESS,
  GET_CHAT_FEED_FAILURE,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_FEED_SUCCESS,
  GET_CHAT_PERSONAL_FAILURE,
  GET_CHAT_PERSONAL_REQUESTED,
  GET_CHAT_PERSONAL_SUCCESS,
  GET_USER_CHAT_LIST_FAILURE,
  GET_USER_CHAT_LIST_SEARCH_SUCCESS,
  GET_USER_CHAT_LIST_SUCCESS,
  ON_CHAT_ONE_ON_ONE_FAILURE,
  ON_CHAT_ONE_ON_ONE_REQUESTED,
  ON_CHAT_ONE_ON_ONE_SUCCESS,
  ON_PIN_ASK_SUCCESS,
  ON_PIN_FAILURE,
  ON_PIN_REQUESTED,
  ON_PIN_SUCCESS,
  ON_UN_PIN_ASK_SUCCESS,
  ON_UN_PIN_FAILURE,
  ON_UN_PIN_REQUESTED,
  ON_UN_PIN_SUCCESS,
  ON_UPDATE_CHAT_CONTEXT_FAILURE,
  ON_UPDATE_CHAT_CONTEXT_REQUESTED,
  RESET_DATA_CHAT,
  SET_CHAT_VISIBLE_MENU,
  SET_USER_CHAT_LIST,
} from './constants';
import {IActionsChat, IChatState} from './types';

export const initialState: IChatState = {
  message: '',
  loading: false,
  success: false,
  listMatches: [],
  listMatchesSearch: [],
  dataChatPersonal: {
    data: [],
    included: [],
  },
  dataFeed: {
    data: [],
    included: [],
  },
  dataChat: {
    data: null,
    included: [],
    introducer: null,
    introducee: null,
    asker: null,
    ask: null,
    isIntroducer: false,
    chatUuid: '',
    showKudos: false,
  },
  dataChatPersonalSelected: null,
  per: 3,
  page: 1,
  personalPer: 3,
  personalPage: 1,
  search_user_id: '',
  callback: () => {},
};

const chatReducer = (state: IChatState = initialState, action: IActionsChat): IChatState => {
  switch (action.type) {
    case GET_CHAT_CONTEXT_REQUESTED:
    case GET_CHAT_ASK_CONTEXT_REQUESTED:
    case GET_CHAT_FEED_REQUESTED:
    case ON_PIN_REQUESTED:
    case ON_UN_PIN_REQUESTED:
    case GET_CHAT_PERSONAL_REQUESTED:
    case ON_CHAT_ONE_ON_ONE_REQUESTED:
    case ON_UPDATE_CHAT_CONTEXT_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_CHAT_FEED_SUCCESS:
      return {...state, loading: false, dataFeed: action.payload?.data};
    case GET_CHAT_ASK_CONTEXT_SUCCESS:
      return {...state, loading: false, dataChat: action.payload};
    case RESET_DATA_CHAT:
      return {...state, loading: false, dataChat: initialState?.dataChat};
    case GET_CHAT_CONTEXT_SUCCESS:
      return {...state, loading: false, dataChatPersonalSelected: action.payload};
    case GET_CHAT_PERSONAL_SUCCESS:
      return {...state, loading: false, dataChatPersonal: action.payload?.data};
    case GET_USER_CHAT_LIST_SUCCESS:
      return {...state, loading: false, listMatches: action.payload?.data};
    case GET_USER_CHAT_LIST_SEARCH_SUCCESS:
      return {...state, loading: false, listMatchesSearch: action.payload?.data};
    case SET_USER_CHAT_LIST:
      return {...state, loading: false, listMatchesSearch: []};
    case ON_CHAT_ONE_ON_ONE_SUCCESS:
      return {...state, loading: false, dataChatPersonalSelected: action.payload};
    case ON_PIN_SUCCESS:
    case ON_UN_PIN_SUCCESS:
      return {...state, ...action?.payload?.data};
    // case ON_PIN_ASK_SUCCESS:
    // case ON_UN_PIN_ASK_SUCCESS:
    //   return {...state, dataFeed: {...state.dataFeed, data: [...action?.payload?.data]}};
    case GET_CHAT_CONTEXT_FAILURE:
    case GET_CHAT_ASK_CONTEXT_FAILURE:
    case GET_CHAT_FEED_FAILURE:
    case ON_PIN_FAILURE:
    case ON_UN_PIN_FAILURE:
    case GET_CHAT_PERSONAL_FAILURE:
    case ON_CHAT_ONE_ON_ONE_FAILURE:
    case ON_UPDATE_CHAT_CONTEXT_FAILURE:
    case GET_USER_CHAT_LIST_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case SET_CHAT_VISIBLE_MENU:
      return {...state, ...action?.payload};
    default:
      return state;
  }
};

export default chatReducer;
