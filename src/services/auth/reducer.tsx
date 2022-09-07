import {
  INITIALIZE_AUTH_REQUESTED,
  INITIALIZE_AUTH_SUCCESS,
  INITIALIZE_AUTH_FAILURE,
  SET_PROGRESS,
  CLEAR_PROGRESS,
  COUNT_DOWN_REQUESTED,
  COUNT_DOWN_SUCCESS,
  COUNT_DOWN_FAILURE,
  LOGOUT,
} from './constants';
import {IAuthState, IActionsAuth} from './types';

export const initialState: IAuthState = {
  error: [],
  loading: true,
  token: '',
  isAppReady: false,
  isLoggedIn: false,
  progress: 240,
};

const authReducer = (state: IAuthState = initialState, action: IActionsAuth): IAuthState => {
  switch (action.type) {
    case INITIALIZE_AUTH_REQUESTED:
    case SET_PROGRESS:
    case CLEAR_PROGRESS:
      return {...state, ...action?.payload, loading: true};
    case COUNT_DOWN_REQUESTED:
      return {...state, progress: 240, loading: true};
    case INITIALIZE_AUTH_SUCCESS:
      return {...state, loading: false, isAppReady: true, isLoggedIn: true, error: ''};
    case COUNT_DOWN_SUCCESS:
      return {...state, isAppReady: true, loading: false, progress: 0};
    case LOGOUT:
      return {...state, isLoggedIn: false};
    case INITIALIZE_AUTH_FAILURE:
    case COUNT_DOWN_FAILURE:
      return {...state, loading: false, isAppReady: true, isLoggedIn: false, error: action?.payload?.error};
    default:
      return state;
  }
};

export default authReducer;
