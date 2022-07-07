import {
  GET_ASK_REQUESTED,
  GET_ASK_SUCCESS,
  GET_ASK_FAILURE,
  GET_ASK_EDIT_REQUESTED,
  GET_ASK_EDIT_SUCCESS,
  GET_ASK_EDIT_FAILURE,
  GET_JOB_REQUESTED,
  GET_JOB_SUCCESS,
  GET_JOB_FAILURE,
  GET_LOCATION_REQUESTED,
  GET_LOCATION_FAILURE,
  GET_LOCATION_SUCCESS,
  SET_DATA_CREATE_ASK_STEP_1,
  SET_DATA_CREATE_ASK_STEP_2,
  SET_DATA_CREATE_ASK_STEP_3,
  SET_LOCATION,
  CREATE_ASK_FAILURE,
  CREATE_ASK_REQUESTED,
  CREATE_ASK_SUCCESS,
  SET_VISIBLE_MENU,
  UPDATE_ASK_SUCCESS,
} from './constants';
import {IActionsCreateAsk, IAskInside, IAskState} from './types';

export const initialState: IAskState = {
  message: '',
  loading: false,
  success: false,
  data: [],
  dataGreetingSuggest: ['Good day,', 'Hello,', '你好！', 'Hey guys!', 'Hola!', 'Xin chào', 'Salaam', 'Namaste'],
  dataPositionDropDown: ["I'm looking for", 'I urgently need', "I'm interested in", 'I want'],
  dataPositionSuggest: [],
  dataLocationSuggest: [],
  dataAskCreated: null,
  textSearch: '',
  dataStep1: null,
  dataStep2: null,
  dataStep3: null,
  dataDetails: null,
  dataAskSelected: null,
  page: 1,
  per: 10,
  keyword: '',
  visibleMenu: {
    show: false,
    coordinate: {
      top: 0,
      left: 0,
    },
  },
  callback: () => {},
};

const askReducer = (state: IAskState = initialState, action: IActionsCreateAsk): IAskState => {
  switch (action.type) {
    case GET_ASK_REQUESTED:
    case GET_JOB_REQUESTED:
    case GET_LOCATION_REQUESTED:
    case CREATE_ASK_REQUESTED:
    case GET_ASK_EDIT_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_ASK_SUCCESS:
      return {...state, loading: false, data: action.payload?.data};
    case CREATE_ASK_SUCCESS:
      return {
        ...state,
        loading: false,
        dataAskCreated: action?.payload?.data,
        data: [...state.data, action?.payload?.data],
      };
    case UPDATE_ASK_SUCCESS: {
      const items = populateUpdateData(state.data, action?.payload?.data);
      return {
        ...state,
        loading: false,
        data: items,
      };
    }
    case GET_JOB_SUCCESS:
      return {...state, loading: false, dataPositionSuggest: action.payload?.data};
    case GET_LOCATION_SUCCESS:
      return {...state, loading: false, dataLocationSuggest: action.payload?.data};
    case GET_ASK_EDIT_SUCCESS:
      return {...state, loading: false, dataDetails: action.payload?.data};
    case SET_LOCATION:
      return {...state, loading: false, dataLocationSuggest: action.payload};
    case SET_DATA_CREATE_ASK_STEP_1:
      return {...state, dataStep1: action?.payload};
    case SET_DATA_CREATE_ASK_STEP_2:
      return {...state, dataStep2: action?.payload};
    case SET_DATA_CREATE_ASK_STEP_3:
      return {...state, dataStep3: action?.payload};
    case SET_VISIBLE_MENU:
      return {...state, ...action?.payload};
    case GET_ASK_FAILURE:
    case CREATE_ASK_FAILURE:
    case GET_JOB_FAILURE:
    case GET_LOCATION_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    case GET_ASK_EDIT_FAILURE:
      return {...state, loading: false, dataDetails: null, message: action.payload.message};
    default:
      return state;
  }
};

const populateUpdateData = (items: IAskInside[], item: IAskInside) => {
  if (items.length > 0) {
    return items.filter(x => (x.id === item?.id ? item : x));
  }
  return [...items, item];
};

export default askReducer;
