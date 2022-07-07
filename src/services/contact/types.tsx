import {
  CONTACT_REQUESTED,
  CONTACT_SUCCESS,
  CONTACT_FAILURE,
  SET_CONTACT,
  SET_CONTACT_SELECTED,
  SHOW_MODAL_CONTACT,
  HIDE_MODAL_CONTACT,
  INVITE_USER_CONTACT_FAILURE,
  INVITE_USER_CONTACT_REQUESTED,
  INVITE_USER_CONTACT_SUCCESS,
} from './constants';

export interface RowItem {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface IContacts {
  alphabet: string;
  data: RowItem[];
}

export interface IContactState {
  errors: any;
  loading: boolean;
  contacts: RowItem[];
  contactSelected: RowItem | null;
  showModal: boolean;
  callback?: () => void;
}

export interface IContactRequest {
  recordID: string;
  familyName: string;
  givenName: string;
  emailAddresses: IEmail[];
  phoneNumbers: IPhone[];
}

export interface IActionSetContact {
  type: typeof SET_CONTACT;
  payload: IContactRequest[];
  callback?: () => void;
}

export interface IActionSetContactSelected {
  type: typeof SET_CONTACT_SELECTED;
  payload: RowItem;
  callback: () => void;
}

export interface IActionShowModalContact {
  type: typeof SHOW_MODAL_CONTACT;
}

export interface IActionHideModalContact {
  type: typeof HIDE_MODAL_CONTACT;
}

export interface IEmail {
  label: string;
  email: string;
}

export interface IPhone {
  label: string;
  number: string;
}

export interface IActionContactRequested {
  type: typeof CONTACT_REQUESTED;
  payload: any;
  callback?: any;
}

export interface IActionContactSuccess {
  type: typeof CONTACT_SUCCESS;
  payload: {
    data: {
      login_token: string;
      email: string;
    };
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionContactFailure {
  type: typeof CONTACT_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}

export interface IActionInviteUserContactRequested {
  type: typeof INVITE_USER_CONTACT_REQUESTED;
  payload: RowItem[];
  callback?: any;
}

export interface IActionInviteUserContactSuccess {
  type: typeof INVITE_USER_CONTACT_SUCCESS;
  payload: {
    data: any;
    message: string;
    success: boolean;
  };
  callback?: any;
}

export interface IActionInviteUserContactFailure {
  type: typeof INVITE_USER_CONTACT_FAILURE;
  payload: {
    error: string;
  };
  callback?: any;
}

export interface IFormData {
  rePassword: string;
  password: string;
}

export type IActionsContact =
  | IActionContactRequested
  | IActionContactSuccess
  | IActionContactFailure
  | IActionSetContact
  | IActionSetContactSelected
  | IActionShowModalContact
  | IActionHideModalContact
  | IActionInviteUserContactRequested
  | IActionInviteUserContactSuccess
  | IActionInviteUserContactFailure;
