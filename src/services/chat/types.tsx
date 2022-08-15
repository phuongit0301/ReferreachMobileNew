import {IAskLocationDataState, ICriteriumDataState, IFiles, IRelationshipsState} from '~Root/services/ask/types';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {IIndustry} from '~Root/services/industry/types';
import {IAvatarMetaData} from '~Root/services/user/types';
import {
  GET_CHAT_ASK_CONTEXT_FAILURE,
  GET_CHAT_ASK_CONTEXT_REQUESTED,
  GET_CHAT_ASK_CONTEXT_SUCCESS,
  GET_CHAT_CONTEXT_FAILURE,
  GET_CHAT_CONTEXT_REQUESTED,
  GET_CHAT_CONTEXT_SUCCESS,
  GET_CHAT_FEED_FAILURE,
  GET_CHAT_FEED_REQUESTED,
  GET_CHAT_FEED_SUCCESS,
  GET_CHAT_PERSONAL_FAILURE,
  GET_CHAT_PERSONAL_REQUESTED,
  GET_CHAT_PERSONAL_SUCCESS,
  GET_USER_CHAT_LIST_FAILURE,
  GET_USER_CHAT_LIST_REQUESTED,
  GET_USER_CHAT_LIST_SEARCH_SUCCESS,
  GET_USER_CHAT_LIST_SUCCESS,
  ON_CHAT_ONE_ON_ONE_FAILURE,
  ON_CHAT_ONE_ON_ONE_REQUESTED,
  ON_CHAT_ONE_ON_ONE_SUCCESS,
  ON_PIN_FAILURE,
  ON_PIN_REQUESTED,
  ON_PIN_SUCCESS,
  ON_UN_PIN_FAILURE,
  ON_UN_PIN_REQUESTED,
  ON_UN_PIN_SUCCESS,
  ON_UPDATE_CHAT_CONTEXT_FAILURE,
  ON_UPDATE_CHAT_CONTEXT_REQUESTED,
  ON_UPDATE_CHAT_CONTEXT_SUCCESS,
  RESET_DATA_CHAT,
  SET_CHAT_VISIBLE_MENU,
  SET_USER_CHAT_LIST,
} from './constants';

export interface IPaginationAndSearch {
  search_user_id?: string;
  per: number;
  page: number;
}

export interface IPersonalPaginationAndSearch {
  search_user_id?: string;
  personalPer: number;
  personalPage: number;
}

export enum PinnableTypeEnum {
  ASK = 'Ask',
  CHAT_CONTEXT = 'ChatContext',
}
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
  ask: any;
  asker: any;
  chatUuid: string;
  introducee?: any;
  introducer?: any;
  isIntroducer?: boolean;
}

export interface IDataChatPersonal {
  data: IData[];
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
  dataChatPersonal: IDataChatPersonal;
  dataChatPersonalSelected: any;
  listMatches: IUserChatList[];
  listMatchesSearch: IUserChatList[];
  dataChat: any | null;
  per: number;
  page: number;
  personalPer: number;
  personalPage: number;
  search_user_id?: string;
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
export interface IActionChatAskContextRequested {
  type: typeof GET_CHAT_ASK_CONTEXT_REQUESTED;
  payload: string;
  callback?: any;
}

export interface IActionChatAskContextSuccess {
  type: typeof GET_CHAT_ASK_CONTEXT_SUCCESS;
  payload: {
    data: IDataChat;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionChatAskContextFailure {
  type: typeof GET_CHAT_ASK_CONTEXT_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionChatOneOnOneRequested {
  type: typeof ON_CHAT_ONE_ON_ONE_REQUESTED;
  payload: {
    member_id: string;
  };
  callback?: any;
}

export interface IActionChatOneOnOneSuccess {
  type: typeof ON_CHAT_ONE_ON_ONE_SUCCESS;
  payload: {
    data: IDataChat;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionChatOneOnOneFailure {
  type: typeof ON_CHAT_ONE_ON_ONE_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}
export interface IActionChatPersonalRequested {
  type: typeof GET_CHAT_PERSONAL_REQUESTED;
  payload: IPersonalPaginationAndSearch;
  callback?: any;
}

export interface IActionChatPersonalSuccess {
  type: typeof GET_CHAT_PERSONAL_SUCCESS;
  payload: {
    data: IDataChatPersonal;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionChatPersonalFailure {
  type: typeof GET_CHAT_PERSONAL_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionOnUpdateChatContextRequested {
  type: typeof ON_UPDATE_CHAT_CONTEXT_REQUESTED;
  payload: {
    contextId: string;
    lastMessage: {
      last_message_metadata: {
        message: string;
        sender_id?: number;
        read_by_user_id?: number;
      };
    };
  };
  callback?: any;
}

export interface IActionOnUpdateChatContextSuccess {
  type: typeof ON_UPDATE_CHAT_CONTEXT_SUCCESS;
  payload: {
    data: any;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionOnUpdateChatContextFailure {
  type: typeof ON_UPDATE_CHAT_CONTEXT_FAILURE;
  payload: {
    message: string;
  };
  callback?: any;
}

export interface IActionChatFeedRequested {
  type: typeof GET_CHAT_FEED_REQUESTED;
  payload: IPaginationAndSearch;
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
    pinnable_id: string;
    pinnable_type: PinnableTypeEnum;
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
    pinnable_id: string;
    pinnable_type: PinnableTypeEnum;
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
  payload?: string;
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

export interface IActionGetUserChatListSearchSuccess {
  type: typeof GET_USER_CHAT_LIST_SEARCH_SUCCESS;
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

export interface IActionSetUserChatList {
  type: typeof SET_USER_CHAT_LIST;
}

export interface IActionResetDataChat {
  type: typeof RESET_DATA_CHAT;
}

export type IActionsChat =
  | IActionChatContextRequested
  | IActionChatContextSuccess
  | IActionChatContextFailure
  | IActionChatAskContextRequested
  | IActionChatAskContextSuccess
  | IActionChatAskContextFailure
  | IActionChatPersonalRequested
  | IActionChatPersonalSuccess
  | IActionChatPersonalFailure
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
  | IActionGetUserChatListSearchSuccess
  | IActionGetUserChatListFailure
  | IActionSetFeedVisibleMenu
  | IActionChatOneOnOneRequested
  | IActionChatOneOnOneSuccess
  | IActionChatOneOnOneFailure
  | IActionOnUpdateChatContextRequested
  | IActionOnUpdateChatContextSuccess
  | IActionOnUpdateChatContextFailure
  | IActionSetUserChatList
  | IActionResetDataChat;
