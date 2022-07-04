/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';

export default class FeedItemsAPI {
  static async getList(payload = 1) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.FEED_ITEMS_LIST_URL(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status === 200) {
        if (response.data?.included?.length > 0) {
          response.data.included[0].attributes.edited = true;
          return {
            data: response.data,
            message: '',
            success: true,
          };
        }
      }
    } catch (error) {
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async getSuggestIntroductionsList() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.SUGGEST_INTRODUCTIONS_LIST_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status === 200) {
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

  static async setFeedItemRead(payload: number) {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.SET_FEED_ITEM_READ_URL(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status === 200) {
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

  static async getPublicProfile(payload: number) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.GET_PUBLIC_PROFILE_URL(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status === 200) {
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
