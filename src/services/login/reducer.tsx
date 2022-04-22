import {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE} from './constants';
import {ILoginState, IActionsLogin} from './types';

export const initialState: ILoginState = {
  message: '',
  loading: false,
  email: '',
  password: '',
  callback: () => {},
};

const loginReducer = (state: ILoginState = initialState, action: IActionsLogin): ILoginState => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case LOGIN_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case LOGIN_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
};

export default loginReducer;
