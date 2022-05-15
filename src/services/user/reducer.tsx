/* eslint-disable @typescript-eslint/no-dynamic-delete */
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
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
    email: '',
    title: '',
    first_name: '',
    last_name: '',
    introductions: '',
    onboard_completed: false,
    confirmed_at: '',
    in_app_status: IN_APP_STATUS_ENUM.SIGNIN_COMPLETED,
    self_industries: [],
    partner_industries: [],
    sell_industries: [],
    created_at: null,
    updated_at: null,
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
      const dataFilter = filterIndustry(state?.userInfo, action?.payload);
      return {...state, userInfo: {...state?.userInfo}};
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
