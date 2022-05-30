/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from 'axios';

import * as API from '~Root/private/api';
import {IActionLoginRequested} from './types';

export default class LoginAPI {
  static async handleLogin(payload: IActionLoginRequested['payload']) {
    try {
      console.log('payload=========>', payload);
      const response = await axios({
        method: 'post',
        url: API.LOGIN_URL,
        data: {user: payload},
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response?.data=========>', response?.data);
      if (response?.data?.success) {
        const token = response?.headers?.authorization.split(' ')[1];
        return {
          data: {...response.data?.data, token: token},
          message: '',
          success: true,
        };
      }
    } catch (error) {
      return {
        message: (error as any)?.response?.data?.message,
        success: false,
      };
    }
  }
}
