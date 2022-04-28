import {
  REGISTER_REQUESTED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_ACCOUNT_REQUESTED,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE,
  INVITATION_REQUESTED,
  INVITATION_SUCCESS,
  INVITATION_FAILURE,
  RENEW_VERIFICATION_CODE_REQUESTED,
  RENEW_VERIFICATION_CODE_SUCCESS,
  RENEW_VERIFICATION_CODE_FAILURE,
  SET_DATA_INVITATION,
} from './constants';

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  grant_type?: string;
}
export interface IStatus {
  success: boolean;
  message: string;
}

export interface IInviteCode {
  invite_code: string;
}

export interface IInvitation {
  id?: string;
  by_user_id?: number;
  invite_user_id?: string | null;
  email: string;
  phone_number?: string;
  name?: string;
  description?: string;
  by_user: any;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

export interface IUser {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  active: boolean;
}
export interface IRegisterState {
  errors: any;
  loading: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  renew: boolean;
  verified: boolean;
  invitation_id?: string;
  dataInvite: IInvitation | null;
  userInfo: IUser | null;
  callback?: (response: any) => void;
}
export interface IActionRegisterRequested {
  type: typeof REGISTER_REQUESTED;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
  };
  callback?: (item?: IStatus) => void;
}
export interface IActionRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: {
    data: {
      access_token: string;
      email: string;
    };
    message: string;
    success: boolean;
  };
  callback?: () => void;
}
export interface IActionRegisterFailure {
  type: typeof REGISTER_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionVerifyAccountRequested {
  type: typeof VERIFY_ACCOUNT_REQUESTED;
  payload: {
    email: string;
    verification_code: string;
  };
  callback: (response: IActionVerifyAccountSuccess['payload']) => void;
}
export interface IActionVerifyAccountSuccess {
  type: typeof VERIFY_ACCOUNT_SUCCESS;
  payload: {
    verified: boolean;
    success: boolean;
    message: string;
    userInfo: IUser | null;
  };
}
export interface IActionVerifyAccountFailure {
  type: typeof VERIFY_ACCOUNT_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionInvitationRequested {
  type: typeof INVITATION_REQUESTED;
  payload: string;
  callback: (response: IActionInvitationSuccess['payload']) => void;
}
export interface IActionInvitationSuccess {
  type: typeof INVITATION_SUCCESS;
  payload: {
    data: IInvitation;
    success: boolean;
    message: string;
  };
}
export interface IActionInvitationFailure {
  type: typeof INVITATION_FAILURE;
  payload: {
    error: string;
  };
}
export interface IActionRenewVerificationCodeRequested {
  type: typeof RENEW_VERIFICATION_CODE_REQUESTED;
  payload: {
    email: string;
  };
  callback?: (payload: IActionRenewVerificationCodeSuccess['payload']) => void;
}
export interface IActionRenewVerificationCodeSuccess {
  type: typeof RENEW_VERIFICATION_CODE_SUCCESS;
  payload: {
    success: boolean;
    message: string;
    renew: boolean;
  };
}
export interface IActionRenewVerificationCodeFailure {
  type: typeof RENEW_VERIFICATION_CODE_FAILURE;
  payload: {
    error: string;
  };
}

export interface IActionSetDataInvitation {
  type: typeof SET_DATA_INVITATION;
  payload: {
    email: string;
  };
}

export type IActionsRegister =
  | IActionRegisterRequested
  | IActionRegisterSuccess
  | IActionRegisterFailure
  | IActionVerifyAccountRequested
  | IActionVerifyAccountSuccess
  | IActionVerifyAccountFailure
  | IActionInvitationRequested
  | IActionInvitationSuccess
  | IActionInvitationFailure
  | IActionRenewVerificationCodeRequested
  | IActionRenewVerificationCodeSuccess
  | IActionRenewVerificationCodeFailure
  | IActionSetDataInvitation;
