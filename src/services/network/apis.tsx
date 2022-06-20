/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';

export default class NetworkAPI {
  static async getList(payload: string) {
    try {
      let url = API.NETWORK_CONNECTION_LIST_URL;

      if (payload && payload !== '') {
        url += `?keyword=${payload}`;
      }
      const response = await axios({
        method: 'GET',
        url: url,
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

  static async removeNetworkConnection(payload: string) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: API.REMOVE_NETWORK_CONNECTION_URL(payload),
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
        message: (error as any)?.response?.data?.errors.length > 0 ? (error as any)?.response?.data?.errors[0] : error,
        success: false,
      };
    }
  }
}
