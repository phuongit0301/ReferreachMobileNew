import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_FAILURE,
} from './constants';
import {INetworkConnectionListState, IActionsUser} from './types';

export const initialState: INetworkConnectionListState = {
  message: '',
  loading: false,
  data: [],
  included: [],
  callback: () => {},
};

const userReducer = (
  state: INetworkConnectionListState = initialState,
  action: IActionsUser,
): INetworkConnectionListState => {
  switch (action.type) {
    case GET_NETWORK_CONNECTION_LIST_REQUESTED:
    case REMOVE_NETWORK_CONNECTION_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_NETWORK_CONNECTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action?.payload?.data || [],
        included: action?.payload?.included || [],
        message: action?.payload?.message,
      };
    case GET_NETWORK_CONNECTION_LIST_FAILURE:
    case REMOVE_NETWORK_CONNECTION_FAILURE:
      return {...state, loading: false, message: action.payload.error};
    default:
      return state;
  }
};

export default userReducer;
