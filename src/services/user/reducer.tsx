/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
} from './constants';
import {IUserState, IActionsUser, IUserInfoState} from './types';

export const initialState: IUserState = {
  error: '',
  loading: false,
  userInfo: {
    first_name: '',
    last_name: '',
    title: '',
    introduction: '',
    industries: {
      myself: [],
      client: [],
      partner: [],
    },
    industriesUpdate: {
      myself: [],
      client: [],
      partner: [],
    },
    network_reach: 0,
    trust_network: [],
    invites_left: 2,
    invoke_invite: null,
    responder: [],
    responder_selected: '',
    responder_tags: [],
    introducer: [],
    introducer_selected: '',
    introducer_tags: [],
    my_ask: [],
    my_ask_selected: null,
    tags: [],
    tag_original: [],
    tag_responder_selected: [],
    tag_introducer_selected: [],
    avatar: {
      url: '',
    },
    profile_completed: false,
  },
  callback: () => {},
};

const userReducer = (state: IUserState = initialState, action: IActionsUser): IUserState => {
  switch (action.type) {
    case USER_INFO_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {...state.userInfo, ...action?.payload?.data},
        error: action?.payload?.message,
      };
    case SET_USER_INDUSTRY: {
      return {
        ...state,
        userInfo: {...state?.userInfo, ...action?.payload},
      };
    }
    case DELETE_DATA_INDUSTRY: {
      const dataFilter = filterIndustry(state?.userInfo?.industries, action?.payload);
      return {...state, userInfo: {...state?.userInfo, industries: dataFilter}};
    }
    case USER_INFO_FAILURE:
      return {...state, loading: false, error: action.payload.error};
    default:
      return state;
  }
};

const filterIndustry = (industries: IUserInfoState['industries'], {index, target}: {index: number; target: string}) => {
  if (target && (industries as any)[target].length > 0) {
    const temp = {...industries};
    delete (temp as any)[target];
    industries = (industries as any)[target].filter((_: any, i: number) => index !== i);
    return {...temp, [target]: industries};
  }
  return industries;
};

export default userReducer;
