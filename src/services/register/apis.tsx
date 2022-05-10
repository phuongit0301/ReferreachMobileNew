/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import xaxios from 'axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {
  IActionInvitationRequested,
  IActionRegisterRequested,
  IActionRenewVerificationCodeRequested,
  IActionVerifyAccountRequested,
} from './types';

export default class RegisterAPI {
  static async handleRegister(payload: IActionRegisterRequested['payload']) {
    try {
      const response = await axios({
        method: 'post',
        url: API.REGISTER_URL,
        data: {
          email: payload?.email,
          password: payload?.password,
          first_name: payload?.firstName,
          last_name: payload?.lastName,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response?.data) {
        throw new Error(i18n.t('not_match'));
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      return {
        data: '',
        message: (error as Error)?.message,
        success: false,
      };
    }
  }

  static async verifyAccount(payload: IActionVerifyAccountRequested['payload']) {
    try {
      const response = await xaxios({
        method: 'post',
        url: API.VERIFY_ACCOUNT_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.status === 200) {
        return {
          verified: (response.data as any)?.verified,
          userInfo: {
            access_token: (response.data as any)?.access_token,
            refresh_token: (response.data as any)?.refresh_token,
            expires_in: (response.data as any)?.refresh_token,
            token_type: 'Bearer',
            created_at: Math.floor(Date.now() / 1000),
          },
          message: '',
          success: true,
        };
      }
      return {
        verified: false,
        userInfo: null,
        message: (response.data as any)?.message,
        success: false,
      };
    } catch (error) {
      return {
        data: '',
        userInfo: null,
        message: (error as Error)?.message,
        success: false,
      };
    }
  }

  static async renewVerificationCode(payload: IActionRenewVerificationCodeRequested['payload']) {
    try {
      const response = await xaxios({
        method: 'post',
        url: API.RENEW_VERIFICATION_CODE_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.status === 200) {
        return {
          renew: true,
          message: '',
          success: true,
        };
      }
      return {
        renew: false,
        message: (response.data as any)?.message,
        success: false,
      };
    } catch (error) {
      return {
        renew: false,
        message: (error as Error)?.message,
        success: false,
      };
    }
  }

  static async invitation(payload: IActionInvitationRequested['payload']) {
    try {
      const response = await xaxios({
        method: 'GET',
        url: API.INVITATION_URL(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response?.status === 200) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
      return {
        data: null,
        message: (response.data as any)?.message,
        success: false,
      };
    } catch (error) {
      return {
        data: null,
        message: (error as Error)?.message,
        success: false,
      };
    }
  }
}
