/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from 'axios';

import * as API from '~Root/private/api';
import {IActionForgotPasswordRequested, IActionLoginRequested} from './types';

export default class LoginAPI {
  static async handleLogin(payload: IActionLoginRequested['payload']) {
    try {
      const response = await axios({
        method: 'post',
        url: API.LOGIN_URL,
        data: {user: payload},
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if ((response?.data as any)?.success) {
        const token = response?.headers?.authorization.split(' ')[1];
        return {
          data: {...(response?.data as any)?.data, token: token},
          message: '',
          success: true,
        };
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      return {
        message: (error as any)?.response?.data?.message,
        success: false,
      };
    }
  }

  static async handleForgotPassword(payload: IActionForgotPasswordRequested['payload']) {
    try {
      const response = await axios({
        method: 'put',
        url: API.FORGOT_PASSWORD_URL,
        data: {email: payload},
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response?.status === 204) {
        return {
          data: response?.data,
          message: '',
          success: true,
        };
      } else {
        return {
          data: null,
          message: (response?.data as any)?.message,
          success: false,
        };
      }
    } catch (error) {
      return {
        data: null,
        message: (error as any)?.response?.data?.message,
        success: false,
      };
    }
  }
}
