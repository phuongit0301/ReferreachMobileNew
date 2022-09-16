import {IPaginationAndSearch} from '~Root/services/ask/types';
import {
  GET_NETWORK_CONNECTION_LIST_REQUESTED,
  GET_NETWORK_CONNECTION_LIST_SUCCESS,
  GET_NETWORK_CONNECTION_LIST_FAILURE,
  REMOVE_NETWORK_CONNECTION_REQUESTED,
  REMOVE_NETWORK_CONNECTION_SUCCESS,
  REMOVE_NETWORK_CONNECTION_FAILURE,
  ON_INVITE_USER_FAILURE,
  ON_INVITE_USER_REQUESTED,
  ON_INVITE_USER_SUCCESS,
  ON_CREATE_MASS_INVITATION_FAILURE,
  ON_CREATE_MASS_INVITATION_REQUESTED,
  ON_CREATE_MASS_INVITATION_SUCCESS,
  GET_MASS_INVITATION_LIST_REQUESTED,
  GET_MASS_INVITATION_LIST_SUCCESS,
  GET_MASS_INVITATION_LIST_FAILURE,
  SET_MASS_INVITATION,
  REMOVE_MASS_INVITE_FAILURE,
  REMOVE_MASS_INVITE_REQUESTED,
  REMOVE_MASS_INVITE_SUCCESS,
} from './constants';

export interface IMassInvitationAttributes {
  status: string;
  reserve_type: string;
  amount: number;
  tags: string[];
  code: string;
  invitation_app_link: string;
  user_left_count: number;
}
export interface IMassInvitation {
  id: string;
  type: string;
  attributes: IMassInvitationAttributes;
}

export interface IMassInvitationListTags {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  taggings_count: number;
}

export interface IMassInvitationListAttributes {
  status: string;
  reserve_type: string;
  amount: number;
  tags: IMassInvitationListTags[];
  code: string;
  invitation_app_link: string;
  user_left_count: number;
}
export interface IMassInvitationList {
  id: string;
  type: string;
  attributes: IMassInvitationListAttributes;
}
export interface INetworkConnectionListState extends IPaginationAndSearch {
  message: string;
  loading: boolean;
  data: any;
  included: IIncluded[];
  dataMassInvitation: IMassInvitation | null;
  listMassInvitation: {
    data: IMassInvitationList[];
  };
  callback: () => void;
}

export interface IAvatarMetadata {
  avatar_url: string;
  avatar_lat: string;
  avatar_lng: string;
}

export interface IMassInvitationPayload {
  tag_list: string;
  amount: number;
}

export interface IIncluded {
  phone: any;
  id: string;
  type: string;
  attributes: {
    title: string;
    first_name?: string;
    last_name?: string;
    pitch: string;
    avatar_metadata: IAvatarMetadata;
    status: number; // 0: pending, 1: active
    phone?: string;
  };
}

export interface IInviteList {
  email: string;
  name: string;
  phone?: string;
}
export interface IInviteUser {
  contacts_list: IInviteList[];
}

export interface IActionNetworkConnectionListRequested {
  type: typeof GET_NETWORK_CONNECTION_LIST_REQUESTED;
  payload: string;
  callback?: any;
}
export interface IActionNetworkConnectionListSuccess {
  type: typeof GET_NETWORK_CONNECTION_LIST_SUCCESS;
  payload: {
    data: any[];
    included: IIncluded[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionNetworkConnectionListFailure {
  type: typeof GET_NETWORK_CONNECTION_LIST_FAILURE;
  payload: {
    data: any[] | [];
    included: IIncluded[] | [];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionRemoveNetworkConnectionRequested {
  type: typeof REMOVE_NETWORK_CONNECTION_REQUESTED;
  payload: string;
  callback?: (
    response: IActionRemoveNetworkConnectionSuccess['payload'] | IActionRemoveNetworkConnectionFailure['payload'],
  ) => void;
}
export interface IActionRemoveNetworkConnectionSuccess {
  type: typeof REMOVE_NETWORK_CONNECTION_SUCCESS;
  payload: {
    data: any[] | [];
    included: IIncluded[] | [];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionRemoveNetworkConnectionFailure {
  type: typeof REMOVE_NETWORK_CONNECTION_FAILURE;
  payload: {
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionRemoveMassInviteRequested {
  type: typeof REMOVE_MASS_INVITE_REQUESTED;
  payload: string;
  callback?: (response: IActionRemoveMassInviteSuccess['payload'] | IActionRemoveMassInviteFailure['payload']) => void;
}
export interface IActionRemoveMassInviteSuccess {
  type: typeof REMOVE_MASS_INVITE_SUCCESS;
  payload: {
    data: any[] | [];
    included: IIncluded[] | [];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionRemoveMassInviteFailure {
  type: typeof REMOVE_MASS_INVITE_FAILURE;
  payload: {
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionInviteUserRequested {
  type: typeof ON_INVITE_USER_REQUESTED;
  payload: IInviteUser[];
  callback?: (response: IActionInviteUserSuccess['payload']) => void;
}
export interface IActionInviteUserSuccess {
  type: typeof ON_INVITE_USER_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionInviteUserFailure {
  type: typeof ON_INVITE_USER_FAILURE;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionCreateMassInvitationRequested {
  type: typeof ON_CREATE_MASS_INVITATION_REQUESTED;
  payload: IMassInvitationPayload;
  callback?: (response: IActionInviteUserSuccess['payload']) => void;
}
export interface IActionCreateMassInvitationSuccess {
  type: typeof ON_CREATE_MASS_INVITATION_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionCreateMassInvitationFailure {
  type: typeof ON_CREATE_MASS_INVITATION_FAILURE;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionGetMassInvitationListRequested {
  type: typeof GET_MASS_INVITATION_LIST_REQUESTED;
  payload: IMassInvitationPayload;
  callback?: (response: IActionGetMassInvitationListSuccess['payload']) => void;
}
export interface IActionGetMassInvitationListSuccess {
  type: typeof GET_MASS_INVITATION_LIST_SUCCESS;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionGetMassInvitationListFailure {
  type: typeof GET_MASS_INVITATION_LIST_FAILURE;
  payload: {
    data: any;
    success: boolean;
    message: string;
  };
  callback?: () => void;
}

export interface IActionSetMassInvitation {
  type: typeof SET_MASS_INVITATION;
  payload: {
    data: any;
  };
}

export type IActionsUser =
  | IActionNetworkConnectionListRequested
  | IActionNetworkConnectionListSuccess
  | IActionNetworkConnectionListFailure
  | IActionRemoveNetworkConnectionRequested
  | IActionRemoveNetworkConnectionSuccess
  | IActionRemoveNetworkConnectionFailure
  | IActionRemoveMassInviteRequested
  | IActionRemoveMassInviteSuccess
  | IActionRemoveMassInviteFailure
  | IActionInviteUserRequested
  | IActionInviteUserSuccess
  | IActionInviteUserFailure
  | IActionCreateMassInvitationRequested
  | IActionCreateMassInvitationSuccess
  | IActionCreateMassInvitationFailure
  | IActionGetMassInvitationListRequested
  | IActionGetMassInvitationListSuccess
  | IActionGetMassInvitationListFailure
  | IActionSetMassInvitation;
