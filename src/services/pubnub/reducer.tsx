import {GET_CREDENTIAL_REQUESTED, GET_CREDENTIAL_SUCCESS, GET_CREDENTIAL_FAILURE} from './constants';
import {IActionsPubnub, IPubNubState} from './types';

export const initialState: IPubNubState = {
  loading: false,
  success: false,
  data: {
    uuid: '',
    publish_key: '',
    subscribe_key: '',
    token: '',
  },
  callback: () => {},
  message: '',
};

const askReducer = (state: IPubNubState = initialState, action: IActionsPubnub): IPubNubState => {
  switch (action.type) {
    case GET_CREDENTIAL_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case GET_CREDENTIAL_SUCCESS:
      return {...state, loading: false, data: action.payload?.data};
    case GET_CREDENTIAL_FAILURE:
      return {...state, loading: false, message: action.payload.message};
    default:
      return state;
  }
};

export default askReducer;
