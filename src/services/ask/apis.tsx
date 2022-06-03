/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
export default class AskAPI {
  static async getAsks(): Promise<any> {
    try {
      const response = await axios({
        method: 'GET',
        url: API.ASK_LIST_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.data) {
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

  static async createAsk(formData: any): Promise<any> {
    try {
      const response = await axios({
        method: 'POST',
        url: API.CREATE_ASK_URL,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.data) {
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

  static async getLocations(payload: string): Promise<any> {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.GET_ALL_LOCATION}?search_value=${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.data) {
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

  static async getJobs(payload: string): Promise<any> {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.GET_ALL_JOB}?search_value=${payload}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.data) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      console.log('error get data job=====>', JSON.stringify(error));
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }
}
