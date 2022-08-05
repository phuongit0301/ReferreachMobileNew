/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {IActionCreateIntroductionRequested} from './types';

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

  static async createIntroduction(payload: IActionCreateIntroductionRequested['payload']) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.CREATE_INTRODUCTION_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: payload,
      });
      if (response && (response.status === 200 || response.status === 201)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        return {
          data: null,
          message: error?.response?.data?.message,
          success: false,
        };
      }
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async filterUserTrustNetwork({dataFeed, dataNetwork}: any) {
    const data = [];
    const included = [];
    if (dataFeed?.data?.length > 0 && dataNetwork.data?.length > 0) {
      let index = 0;
      for (const item of dataNetwork.included) {
        if (+item?.id !== +dataFeed?.data[0]?.attributes?.user?.id) {
          data.push(dataNetwork?.data[index]);
          included.push(dataNetwork?.included[index]);
        }
        index++;
      }
    }

    return {data: data, included: included};
  }
}
