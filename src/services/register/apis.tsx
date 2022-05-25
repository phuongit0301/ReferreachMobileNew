/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import xaxios from 'axios';

import * as API from '~Root/private/api';
import {IActionInvitationRequested, IActionRegisterRequested, IActionVerifyAccountRequested} from './types';

export default class RegisterAPI {
  static async handleRegister(payload: IActionRegisterRequested['payload']) {
    try {
      const response = await axios({
        method: 'post',
        url: API.REGISTER_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.status === 200) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      return {
        data: '',
        message: (error as any)?.response?.data?.message,
        success: false,
      };
    }
  }

  static async verifyAccount(payload: IActionVerifyAccountRequested['payload']) {
    try {
      console.log('payload=========>', payload);
      const response = await xaxios({
        method: 'put',
        url: API.VERIFY_ACCOUNT_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response============>', response);
      if (response?.status === 200) {
        return {
          verified: response.data,
          message: '',
          success: true,
        };
      }
      return {
        verified: false,
        message: response.data?.message,
        success: false,
      };
    } catch (error) {
      console.log('error=======>', JSON.stringify(error));
      return {
        data: '',
        message: (error as Error)?.message,
        success: false,
      };
    }
  }

  static async renewVerificationCode() {
    try {
      const response = await xaxios({
        method: 'put',
        url: API.RENEW_VERIFICATION_CODE_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response========>', response);
      if (response?.status === 200) {
        return {
          renew: true,
          message: '',
          success: true,
        };
      }
      return {
        renew: false,
        message: response.data?.message,
        success: false,
      };
    } catch (error) {
      console.log('error renew=======>', JSON.stringify(error));
      console.log('error renew=======>', error?.response);
      console.log('error renew=======>', error?.response?.data);
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
        message: response.data?.message,
        success: false,
      };
    } catch (error) {
      return {
        data: null,
        message: (error as any)?.response?.data?.errors ? (error as any)?.response?.data?.errors[0] : '',
        success: false,
      };
    }
  }
}
