import {
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_ACCOUNT_REQUESTED,
  VERIFY_ACCOUNT_SUCCESS,
  RENEW_VERIFICATION_CODE_REQUESTED,
  RENEW_VERIFICATION_CODE_SUCCESS,
  RENEW_VERIFICATION_CODE_FAILURE,
  INVITATION_REQUESTED,
  INVITATION_SUCCESS,
  INVITATION_FAILURE,
  SET_DATA_INVITATION,
  SET_TEMP_TOKEN,
  INVITATION_REJECT_FAILURE,
  INVITATION_REJECT_SUCCESS,
  INVITATION_REJECT_REQUESTED,
} from './constants';
import {IRegisterState, IActionsRegister} from './types';

export const initialState: IRegisterState = {
  errors: [],
  loading: false,
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  renew: false,
  verified: false,
  dataInvite: null,
  userInfo: null,
  token: null,
  callback: (response?: any) => {},
};

const registerReducer = (state: IRegisterState = initialState, action: IActionsRegister): IRegisterState => {
  switch (action.type) {
    case REGISTER_REQUESTED:
    case RENEW_VERIFICATION_CODE_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case INVITATION_REQUESTED:
    case INVITATION_REJECT_REQUESTED:
      return {...state, callback: action?.callback, loading: true, invitation_id: action?.payload};
    case VERIFY_ACCOUNT_REQUESTED:
      return {...state, callback: action?.callback, verified: false, loading: true};
    case REGISTER_SUCCESS:
    case VERIFY_ACCOUNT_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case RENEW_VERIFICATION_CODE_SUCCESS:
      return {...state, loading: false, renew: action.payload?.renew};
    case INVITATION_SUCCESS:
      return {...state, loading: false, dataInvite: action.payload?.data};
    case INVITATION_REJECT_SUCCESS:
      return {...state, loading: false, dataInvite: null};
    case SET_DATA_INVITATION:
      return {...state, loading: false, dataInvite: action.payload};
    case SET_TEMP_TOKEN:
      return {...state, token: action?.payload};
    case REGISTER_FAILURE:
    case RENEW_VERIFICATION_CODE_FAILURE:
    case INVITATION_FAILURE:
    case INVITATION_REJECT_FAILURE:
      return {...state, loading: false, errors: action.payload.error};
    default:
      return state;
  }
};

export default registerReducer;
