import {
  REGISTER_REQUESTED,
  VERIFY_ACCOUNT_REQUESTED,
  RENEW_VERIFICATION_CODE_REQUESTED,
  INVITATION_REQUESTED,
  SET_DATA_INVITATION,
  SET_TEMP_TOKEN,
  INVITATION_REJECT_REQUESTED,
} from './constants';
import {
  IActionInvitationRejectRequested,
  IActionInvitationRejectSuccess,
  IActionInvitationRequested,
  IActionInvitationSuccess,
  IActionRegisterRequested,
  IActionRenewVerificationCodeSuccess,
  IActionVerifyAccountRequested,
  IInvitation,
} from './types';

export const registerRequest = (payload: IActionRegisterRequested['payload'], callback: (response: any) => void) => {
  return {
    type: REGISTER_REQUESTED,
    payload,
    callback,
  };
};

export const verifyAccountRequest = (
  payload: IActionVerifyAccountRequested['payload'],
  callback: (response: any) => void,
) => {
  return {
    type: VERIFY_ACCOUNT_REQUESTED,
    payload,
    callback,
  };
};

export const invitationRequest = (
  payload: IActionInvitationRequested['payload'],
  callback: (response: IActionInvitationSuccess['payload']) => void,
) => {
  return {
    type: INVITATION_REQUESTED,
    payload,
    callback,
  };
};

export const invitationRejectRequest = (
  payload: IActionInvitationRejectRequested['payload'],
  callback: (response: IActionInvitationRejectSuccess['payload']) => void,
) => {
  return {
    type: INVITATION_REJECT_REQUESTED,
    payload,
    callback,
  };
};

export const renewVerificationCodeRequest = (
  callback: (response: IActionRenewVerificationCodeSuccess['payload']) => void,
) => ({
  type: RENEW_VERIFICATION_CODE_REQUESTED,
  callback,
});

export const setDataInvitation = (payload: IInvitation) => {
  return {
    type: SET_DATA_INVITATION,
    payload,
  };
};

export const setTempToken = (payload: string) => {
  return {
    type: SET_TEMP_TOKEN,
    payload,
  };
};
