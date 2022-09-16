import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_FAILURE,
  ON_CREATE_MASS_INVITATION_REQUESTED,
  ON_CREATE_MASS_INVITATION_SUCCESS,
  ON_CREATE_MASS_INVITATION_FAILURE,
  GET_MASS_INVITATION_LIST_REQUESTED,
  GET_MASS_INVITATION_LIST_SUCCESS,
  GET_MASS_INVITATION_LIST_FAILURE,
  SET_MASS_INVITATION,
  REMOVE_MASS_INVITE_SUCCESS,
  REMOVE_MASS_INVITE_REQUESTED,
  REMOVE_MASS_INVITE_FAILURE,
} from './constants';
import {INetworkConnectionListState, IActionsUser} from './types';

export const initialState: INetworkConnectionListState = {
  message: '',
  loading: false,
  data: [],
  included: [],
  page: 1,
  per: 10,
  keyword: '',
  dataMassInvitation: null,
  listMassInvitation: {
    data: [],
  },
  callback: () => {},
};

const userReducer = (
  state: INetworkConnectionListState = initialState,
  action: IActionsUser,
): INetworkConnectionListState => {
  switch (action.type) {
    case GET_NETWORK_CONNECTION_LIST_REQUESTED:
    case REMOVE_NETWORK_CONNECTION_REQUESTED:
    case ON_CREATE_MASS_INVITATION_REQUESTED:
    case GET_MASS_INVITATION_LIST_REQUESTED:
    case REMOVE_MASS_INVITE_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_NETWORK_CONNECTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload?.data || [],
        included: action?.payload?.included || [],
        message: action?.payload?.message,
      };
    case REMOVE_MASS_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: '',
        dataMassInvitation: null,
      };
    case ON_CREATE_MASS_INVITATION_SUCCESS:
    case SET_MASS_INVITATION:
      return {...state, dataMassInvitation: action?.payload?.data};
    case GET_MASS_INVITATION_LIST_SUCCESS:
      return {...state, listMassInvitation: action?.payload?.data};
    case GET_NETWORK_CONNECTION_LIST_FAILURE:
    case REMOVE_NETWORK_CONNECTION_FAILURE:
    case ON_CREATE_MASS_INVITATION_FAILURE:
    case GET_MASS_INVITATION_LIST_FAILURE:
    case REMOVE_MASS_INVITE_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
};

export default userReducer;
