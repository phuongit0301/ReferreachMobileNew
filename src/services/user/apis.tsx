/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {IActionUpdateUserAvatarRequested, IActionUpdateUserInAppStatusRequested} from './types';

export default class UserAPI {
  static async handleUserInfo() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.USER_INFO_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.status === 200) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      console.log('JSONERRO=======>', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserAvatar(payload: IActionUpdateUserAvatarRequested['payload']) {
    try {
      // const response = await axios({
      //   method: 'PUT',
      //   url: 'http://127.0.0.1:8080/api/upload',
      //   data: payload,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const response = await axios({
        method: 'PUT',
        url: API.USER_AVATAR_URL,
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // const response = await axios.put(API.USER_AVATAR_URL, payload, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // });
      if (response?.data) {
        return {
          data: response?.data?.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserProfile(payload: any) {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.USER_INFO_URL,
        data: payload,
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
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserInAppStatus(payload: IActionUpdateUserInAppStatusRequested['payload']) {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.USER_IN_APP_STATUS_URL,
        data: payload,
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
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }
}
