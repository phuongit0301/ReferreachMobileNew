/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {
  USER_INFO_REQUESTED,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  SET_USER_INDUSTRY,
  DELETE_DATA_INDUSTRY,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUESTED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_AVATAR_FAILURE,
  UPDATE_USER_AVATAR_REQUESTED,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_IN_APP_STATUS_REQUESTED,
  UPDATE_USER_IN_APP_STATUS_SUCCESS,
} from './constants';
import {IUserState, IActionsUser, IUserInfoState} from './types';

export const initialState: IUserState = {
  error: '',
  loading: false,
  userInfo: {
    email: '',
    title: '',
    first_name: '',
    last_name: '',
    pitch: '',
    onboard_completed: false,
    confirmed_at: '',
    in_app_status: IN_APP_STATUS_ENUM.INVITATION_SENT,
    self_industries: [],
    partner_industries: [],
    sell_industries: [],
    created_at: null,
    updated_at: null,
    avatar_metadata: {
      avatar_url: '',
      avatar_lat: null,
      avatar_lng: null,
    },
  },
  callback: () => {},
};

const userReducer = (state: IUserState = initialState, action: IActionsUser): IUserState => {
  switch (action.type) {
    case USER_INFO_REQUESTED:
    case UPDATE_USER_PROFILE_REQUESTED:
    case UPDATE_USER_AVATAR_REQUESTED:
    case UPDATE_USER_IN_APP_STATUS_REQUESTED:
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
    case UPDATE_USER_PROFILE_SUCCESS:
      return {...state, userInfo: {...state?.userInfo, ...action?.payload}};
    case UPDATE_USER_IN_APP_STATUS_SUCCESS:
      return {...state, userInfo: {...state?.userInfo, ...action?.payload?.data}};
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          avatar_metadata: {...state.userInfo?.avatar_metadata, ...action?.payload?.attributes?.avatar_metadata},
        },
      };
    case DELETE_DATA_INDUSTRY: {
      const dataFilter = filterIndustry(state?.userInfo, action?.payload);
      return {...state, userInfo: {...state?.userInfo, ...dataFilter}};
    }
    case USER_INFO_FAILURE:
    case UPDATE_USER_PROFILE_FAILURE:
    case UPDATE_USER_AVATAR_FAILURE:
      return {...state, loading: false, error: action.payload.error};
    default:
      return state;
  }
};

const filterIndustry = (industries: IUserInfoState, {index, target}: {index: number; target: string}) => {
  if (target && (industries as any)[target].length > 0) {
    const temp = {...industries};
    delete (temp as any)[target];
    industries = (industries as any)[target].filter((_: any, i: number) => index !== i);
    return {...temp, [target]: industries};
  }
  return industries;
};

export default userReducer;
