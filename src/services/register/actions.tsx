import {
  REGISTER_REQUESTED,
  VERIFY_ACCOUNT_REQUESTED,
  RENEW_VERIFICATION_CODE_REQUESTED,
  INVITATION_REQUESTED,
  SET_DATA_INVITATION,
} from './constants';
import {
  IActionInvitationRequested,
  IActionInvitationSuccess,
  IActionRegisterRequested,
  IActionRenewVerificationCodeRequested,
  IActionRenewVerificationCodeSuccess,
  IActionVerifyAccountRequested,
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

export const renewVerificationCodeRequest = (
  payload: IActionRenewVerificationCodeRequested['payload'],
  callback: (response: IActionRenewVerificationCodeSuccess['payload']) => void,
) => ({
  type: RENEW_VERIFICATION_CODE_REQUESTED,
  payload,
  callback,
});

export const setDataInvitation = (payload: {email: string}) => {
  return {
    type: SET_DATA_INVITATION,
    payload,
  };
};
