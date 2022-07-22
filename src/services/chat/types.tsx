import {IAskLocationDataState, ICriteriumDataState, IFiles, IRelationshipsState} from '~Root/services/ask/types';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {IIndustry} from '~Root/services/industry/types';
import {IAvatarMetaData} from '~Root/services/user/types';
import {
  GET_CHAT_CONTEXT_FAILURE,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_SUCCESS,
  GET_CHAT_FEED_FAILURE,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_FEED_SUCCESS,
  GET_USER_CHAT_LIST_FAILURE,
  GET_USER_CHAT_LIST_REQUESTED,
  GET_USER_CHAT_LIST_SUCCESS,
  ON_PIN_FAILURE,
  ON_PIN_REQUESTED,
  ON_PIN_SUCCESS,
  ON_UN_PIN_FAILURE,
  ON_UN_PIN_REQUESTED,
  ON_UN_PIN_SUCCESS,
  SET_CHAT_VISIBLE_MENU,
} from './constants';

export interface IListMatches {
  id: string;
  name: string;
  image: string;
}

export interface IPeopleToAsk {
  id: string;
  name: string;
  image: string;
  title: string;
  description?: string;
  status: string;
  count: number;
  hour: string;
}
export interface IUserChatList {
  id: string;
  type: string;
  attributes: IUserChatListAttributes;
  relationships: IUserChatListRelationships;
}
export interface IUserChatListAttributes {
  email: string;
  title: string | null;
  first_name: string;
  last_name: string;
  pitch: string | null;
  created_at: string | null;
  updated_at: string | null;
  onboard_completed: boolean;
  confirmed_at: string | null;
  in_app_status: IN_APP_STATUS_ENUM;
  avatar?: string;
  avatar_metadata: IAvatarMetaData;
}

export interface IUserChatListRelationships {
  self_industries: {data: IIndustry[]};
  partner_industries: {data: IIndustry[]};
  sell_industries: {data: IIndustry[]};
}

export enum STATUS_ENUM {
  NEW_INTRO = 'New Intro',
  INTRO_UPDATE = 'Intro Update',
  ASK_ENDED = 'Ask Ended',
  FEEDBACK = 'Feedback',
}

export interface ILastMessage {
  message: string;
  sender_id: number;
}
export interface IDataChatAttributes {
  chat_uuid: string;
  members_first_message_sent: boolean;
  last_message_metadata: ILastMessage;
  chat_box_type: string;
}

export interface IRelationshipData {
  id: string;
  type: string;
}

export interface IDataChatRelationships {
  members: {
    data: IRelationshipData[];
  };
  ask: {
    data: IRelationshipData;
  };
  chat_contextable: {
    data: IRelationshipData;
  };
}

export interface IAvatarMetadata {
  avatar_url: string;
  avatar_lat: string;
  avatar_lng: string;
}

export interface IAttributes {
  title: string;
  first_name?: string;
  last_name?: string;
  pubnub_uuid: string;
  pitch: string;
  avatar_metadata: IAvatarMetadata;
  full_name: string;
}

export interface IAttributesRelationship {
  additional_detail: string;
  ask_location?: IAskLocationDataState;
  business_detail?: string;
  business_requirement: string;
  created_at: Date;
  criterium: ICriteriumDataState[];
  deadline: Date;
  demographic: string;
  documents: IFiles[];
  edited: boolean;
  greeting: string;
  open_edit: boolean;
  status: string;
  updated_at: Date;
  user_role: string;
  related_chat_contexts: any;
  pinned: boolean;
}
export interface IIncluded {
  id: string;
  type: string;
  attributes: IAttributes & IAttributesRelationship;
  relationships: IRelationshipsState;
}

export interface IData {
  id: string;
  type: string;
  attributes: IDataChatAttributes;
  relationships: IDataChatRelationships;
}
export interface IDataChat {
  data: IData;
  included: IIncluded[];
}

export interface IDataChatFeed {
  data: IIncluded[];
  included: IUserChatList[];
}
export interface IChatState {
  message: string;
  loading: boolean;
  success: boolean;
  dataFeed: IDataChatFeed;
  listMatches: IUserChatList[];
  dataChat: any | null;
  callback?: any;
}

export interface IActionChatContextRequested {
  type: typeof GET_CHAT_CONTEXT_REQUESTED;
  payload: string;
  callback?: any;
}

export interface IActionChatContextSuccess {
  type: typeof GET_CHAT_CONTEXT_SUCCESS;
  payload: {
    data: IDataChat;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionChatContextFailure {
  type: typeof GET_CHAT_CONTEXT_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionChatFeedRequested {
  type: typeof GET_CHAT_FEED_REQUESTED;
  callback?: any;
}

export interface IActionChatFeedSuccess {
  type: typeof GET_CHAT_FEED_SUCCESS;
  payload: {
    data: IDataChatFeed;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionChatFeedFailure {
  type: typeof GET_CHAT_FEED_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionOnPinRequested {
  type: typeof ON_PIN_REQUESTED;
  payload: {
    askId: string;
    index: number;
  };
  callback?: any;
}

export interface IActionOnPinSuccess {
  type: typeof ON_PIN_SUCCESS;
  payload: {
    data: IIncluded[];
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionOnPinFailure {
  type: typeof ON_PIN_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionOnUnPinRequested {
  type: typeof ON_UN_PIN_REQUESTED;
  payload: {
    askId: string;
    index: number;
  };
  callback?: any;
}

export interface IActionOnUnPinSuccess {
  type: typeof ON_UN_PIN_SUCCESS;
  payload: {
    data: IIncluded[];
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionOnUnPinFailure {
  type: typeof ON_UN_PIN_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}
export interface IActionGetUserChatListRequested {
  type: typeof GET_USER_CHAT_LIST_REQUESTED;
  callback?: any;
}

export interface IActionGetUserChatListSuccess {
  type: typeof GET_USER_CHAT_LIST_SUCCESS;
  payload: {
    data: IUserChatList[];
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionGetUserChatListFailure {
  type: typeof GET_USER_CHAT_LIST_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}
export interface IActionSetFeedVisibleMenu {
  type: typeof SET_CHAT_VISIBLE_MENU;
  payload: any;
  callback: () => void;
}

export type IActionsChat =
  | IActionChatContextRequested
  | IActionChatContextSuccess
  | IActionChatContextFailure
  | IActionChatFeedRequested
  | IActionChatFeedSuccess
  | IActionChatFeedFailure
  | IActionOnPinRequested
  | IActionOnPinSuccess
  | IActionOnPinFailure
  | IActionOnUnPinRequested
  | IActionOnUnPinSuccess
  | IActionOnUnPinFailure
  | IActionGetUserChatListSuccess
  | IActionGetUserChatListSuccess
  | IActionGetUserChatListFailure
  | IActionSetFeedVisibleMenu;
