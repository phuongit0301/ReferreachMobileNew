/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {IPaginationAndSearch} from './types';
export default class AskAPI {
  static async getAsks(payload: IPaginationAndSearch): Promise<any> {
    try {
      let params = {};
      if (payload) {
        params = Object.keys(payload)
          .map((key: string) => `${key}=${payload[key]}`)
          .join('&');
      }
      const response = await axios({
        method: 'GET',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        url: `${API.ASK_LIST_URL}?${params}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.data) {
        return {
          data: (response.data as any)?.data?.reverse(),
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

  static async getAskDetails(payload: number): Promise<any> {
    try {
      const response = await axios({
        method: 'GET',
        url: API.ASK_DETAILS_URL(payload),
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

  static async updateAsk(id: number, formData: any): Promise<any> {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.UPDATE_ASK_URL(id),
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

  static async deleteDocumentAsk(id: number, formData: any): Promise<any> {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.UPDATE_ASK_URL(id),
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
