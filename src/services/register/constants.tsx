import {IAsyncCall} from '~Root/types';

export const REGISTER_REQUESTED = 'REGISTER/REQUESTED';
export const REGISTER_SUCCESS = 'REGISTER/SUCCESS';
export const REGISTER_FAILURE = 'REGISTER/FAILURE';

export const ASYNC_REGISTER: IAsyncCall = {
  REQUESTED: REGISTER_REQUESTED,
  SUCCESS: REGISTER_SUCCESS,
  FAILURE: REGISTER_FAILURE,
};

export const VERIFY_ACCOUNT_REQUESTED = 'VERIFY_ACCOUNT/REQUESTED';
export const VERIFY_ACCOUNT_SUCCESS = 'VERIFY_ACCOUNT/SUCCESS';
export const VERIFY_ACCOUNT_FAILURE = 'VERIFY_ACCOUNT/FAILURE';

export const RENEW_VERIFICATION_CODE_REQUESTED = 'RENEW_VERIFICATION_CODE/REQUESTED';
export const RENEW_VERIFICATION_CODE_SUCCESS = 'RENEW_VERIFICATION_CODE/SUCCESS';
export const RENEW_VERIFICATION_CODE_FAILURE = 'RENEW_VERIFICATION_CODE/FAILURE';

export const INVITATION_REQUESTED = 'INVITATION/REQUESTED';
export const INVITATION_SUCCESS = 'INVITATION/SUCCESS';
export const INVITATION_FAILURE = 'INVITATION/FAILURE';

export const INVITATION_REJECT_REQUESTED = 'INVITATION_REJECT/REQUESTED';
export const INVITATION_REJECT_SUCCESS = 'INVITATION_REJECT/SUCCESS';
export const INVITATION_REJECT_FAILURE = 'INVITATION_REJECT/FAILURE';

export const SET_DATA_INVITATION = 'DATA_INVITATION/SET';
export const SET_TEMP_TOKEN = 'TEMP_TOKEN/SET';
