/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';

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

  static async getTags() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_TAGS_URL,
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

  static async getIntroducer(payload: number) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_ASK_INTRODUCER_URL(payload),
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

  static async getResponder(payload: number) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_ASK_RESPONDER_URL(payload),
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
}
