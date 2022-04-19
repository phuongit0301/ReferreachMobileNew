/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_DATA_USER_INFO,
  ON_REVOKE_INVITE,
  SET_USER_PROFILE,
  SET_USER_PROFILE_REFER,
  SET_USER_PROFILE_AVATAR,
  SET_USER_PROFILE_TEMP,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_SUCCESS,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  GET_ASK_INTRODUCER_REQUESTED,
  GET_ASK_INTRODUCER_SUCCESS,
  GET_ASK_INTRODUCER_FAILURE,
  GET_ASK_RESPONDER_REQUESTED,
  GET_ASK_RESPONDER_SUCCESS,
  GET_ASK_RESPONDER_FAILURE,
  GET_TAG_REQUESTED,
  GET_TAG_SUCCESS,
  GET_TAG_FAILURE,
  FILTER_DATA_TAG,
  SET_TAG_SELECTED,
  DELETE_TAG,
  ON_CHANGE_INTRODUCER,
  ON_CHANGE_RESPONDER,
  CLEAR_FEEDBACK,
} from './constants';
import {IUserState, IActionsUser, IUserInfoState} from './types';

export const initialState: IUserState = {
  errors: [],
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
  profile: null,
  profile_refer: null,
  userRefer: {
    data: [],
    textSearch: '',
  },
  profile_temp: null,
  avatar_temp: null,
  callback: () => {},
};

const userReducer = (state: IUserState = initialState, action: IActionsUser): IUserState => {
  switch (action.type) {
    case GET_ASK_RESPONDER_REQUESTED:
    case GET_ASK_INTRODUCER_REQUESTED:
    case GET_TAG_REQUESTED:
      return {...state, loading: true};
    case USER_INFO_REQUESTED:
    case UPDATE_USER_PROFILE_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {...state.userInfo, ...action?.payload?.data},
        errors: [action?.payload?.message],
      };
    case USER_INFO_FAILURE:
      return {...state, loading: false, errors: [action.payload.error]};
    case SET_DATA_USER_INFO:
      return {
        ...state,
        userInfo: {...state?.userInfo, my_ask: [...state?.userInfo?.my_ask, action?.payload?.data].reverse()},
      };
    case ON_REVOKE_INVITE:
      return {...state, userInfo: {...state.userInfo, invoke_invite: action?.payload}};
    case SET_USER_PROFILE:
      return {...state, profile: action?.payload};
    case SET_USER_PROFILE_REFER:
      return {...state, profile_refer: action?.payload};
    case UPDATE_USER_PROFILE_FAILURE:
    case GET_ASK_INTRODUCER_FAILURE:
    case GET_ASK_RESPONDER_FAILURE:
    case GET_TAG_FAILURE:
      return {...state, loading: false, errors: action?.payload?.error};
    case SET_USER_PROFILE_AVATAR:
      return {
        ...state,
        avatar_temp: action?.payload,
        userInfo: {...state.userInfo, avatar: {url: action?.payload?.uri ?? ''}},
      };
    case SET_USER_PROFILE_TEMP:
      return {...state, profile_temp: action?.payload};
    case UPDATE_USER_PROFILE_SUCCESS:
      return {...state, avatar_temp: null, profile_temp: null, userInfo: {...state?.userInfo, ...action?.payload}};
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
    case GET_ASK_INTRODUCER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {
          ...state?.userInfo,
          introducer: action?.payload?.data,
          introducer_selected: action?.payload?.introducer_selected,
        },
      };
    case GET_ASK_RESPONDER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {
          ...state?.userInfo,
          responder: action?.payload?.data,
          responder_selected: action.payload?.responder_selected,
        },
      };
    case GET_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: {...state?.userInfo, tags: action?.payload?.data, tag_original: action?.payload?.data},
      };
    case FILTER_DATA_TAG: {
      const dataTag = filterTag(state, action.payload);
      return {...state, userInfo: {...state?.userInfo, tags: dataTag}};
    }
    case SET_TAG_SELECTED:
      return {...state, userInfo: {...state.userInfo, ...action?.payload}};
    case DELETE_TAG: {
      const dataFilter = deleteTag(state?.userInfo, action?.payload);
      return {...state, userInfo: {...state?.userInfo, ...dataFilter}};
    }
    case ON_CHANGE_RESPONDER:
      return {...state, userInfo: {...state?.userInfo, responder_selected: action?.payload}};
    case ON_CHANGE_INTRODUCER:
      return {...state, userInfo: {...state?.userInfo, responder_selected: action?.payload}};
    case CLEAR_FEEDBACK:
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          responder_selected: '',
          responder_tags: [],
          introducer_selected: '',
          introducer_tags: [],
          tag_responder_selected: [],
          tag_introducer_selected: [],
          tags: [],
        },
      };
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

const filterTag = (state: IUserState, textSearch: string) => {
  const arr: string[] = [];
  if (state.userInfo?.tag_original.length > 0 && textSearch !== '') {
    state.userInfo?.tag_original.forEach(x => {
      if (x?.toLowerCase().includes(textSearch?.toLowerCase())) {
        arr.push(x);
      }
    });
  }
  return arr;
};

const deleteTag = (userInfo: IUserState['userInfo'], {index, tagType}: {index: number; tagType: number}) => {
  let data;
  if (tagType === 1 && userInfo?.tag_responder_selected.length > 0) {
    data = {
      tag_responder_selected: (userInfo?.tag_responder_selected as any).filter((_: any, i: number) => index !== i),
    };
  }

  if (tagType === 2 && userInfo?.tag_introducer_selected.length > 0) {
    data = {
      tag_introducer_selected: (userInfo?.tag_introducer_selected as any).filter((_: any, i: number) => index !== i),
    };
  }
  return data;
};

export default userReducer;
