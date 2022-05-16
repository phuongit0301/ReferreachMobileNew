/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {IActionUpdateUserInAppStatusRequested} from './types';

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
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserAvatar(payload: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.USER_INFO_URL,
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
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
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async updateUserProfile(payload: any) {
    try {
      const response = await axios({
        method: 'POST',
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
