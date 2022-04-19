/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {IActionLoginRequested} from './types';

export default class LoginAPI {
  static async handleLogin(payload: IActionLoginRequested['payload']) {
    try {
      const response = await axios({
        method: 'post',
        url: API.LOGIN_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (!response?.data) {
        throw new Error('Error');
      }
      return {
        data: response.data,
        message: '',
        success: true,
      };
    } catch (error) {
      return {
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          active: (error as any)?.response?.data?.status !== 'inactive',
        },
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        message: (error as any)?.response?.data?.error,
        success: false,
      };
    }
  }
}
