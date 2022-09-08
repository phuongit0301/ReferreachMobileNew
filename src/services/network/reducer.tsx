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
  page: 1,
  per: 10,
  keyword: '',
  callback: () => {},
};

const items = [
  {
    id: '591',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '129',
          type: 'users',
        },
      },
    },
  },
  {
    id: '567',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '117',
          type: 'users',
        },
      },
    },
  },
  {
    id: '560',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '111',
          type: 'users',
        },
      },
    },
  },
  {
    id: '592',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '129',
          type: 'users',
        },
      },
    },
  },
  {
    id: '568',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '117',
          type: 'users',
        },
      },
    },
  },
  {
    id: '561',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '111',
          type: 'users',
        },
      },
    },
  },
  {
    id: '569',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '117',
          type: 'users',
        },
      },
    },
  },
  {
    id: '562',
    type: 'network_connections',
    attributes: {
      status: 'accepted',
      tag_list: [],
    },
    relationships: {
      connected_user: {
        data: {
          id: '111',
          type: 'users',
        },
      },
    },
  },
];

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
        data: [...action?.payload?.data, ...items] || [],
        included: action?.payload?.included || [],
        message: action?.payload?.message,
      };
    case GET_NETWORK_CONNECTION_LIST_FAILURE:
    case REMOVE_NETWORK_CONNECTION_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
};

export default userReducer;
