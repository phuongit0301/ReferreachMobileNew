/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {
  IActionGetAskResponderSuccess,
  IActionOnEndAskRequest,
  IActionOnSendKudosRequest,
  IActionOnUpdateExtendDeadlineRequest,
  IPaginationAndSearch,
} from './types';
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

  static async getAskResponder(payload: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.ASK_RESPONDER_URL(payload)}`,
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
      return {
        data: null,
        message: 'Not found',
        success: false,
      };
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

  static async updateExtendDeadline(payload: IActionOnUpdateExtendDeadlineRequest['payload']) {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${API.ON_UPDATE_EXTEND_DEADLINE_URL(payload?.askId, payload?.deadline)}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response=====>', response);
      if (response && (response?.status === 200 || response?.status === 204)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error: any) {
      if (error.response?.data) {
        return {
          data: null,
          message: error.response?.data.error,
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

  static async endAsk(payload: IActionOnEndAskRequest['payload']) {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${API.ON_END_ASK_URL(payload)}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && (response?.status === 200 || response?.status === 204)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error: any) {
      if (error.response?.data) {
        return {
          data: null,
          message: error.response?.data.error,
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

  static async sendKudos(payload: IActionOnSendKudosRequest['payload']) {
    try {
      let url = `${API.ON_SEND_KUDOS_URL(payload?.askId)}`;
      let params = {};
      if (payload.params) {
        params = Object.keys(payload?.params)
          .map((key: string) => `${key}=${payload?.params[key]}`)
          .join('&');
        url += `?${params}`;
      }

      const response = await axios({
        method: 'PUT',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && (response?.status === 200 || response?.status === 204)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error: any) {
      if (error.response?.data) {
        return {
          data: null,
          message: error.response?.data.error,
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

  static async filterUserRole(payload: IActionGetAskResponderSuccess['payload']['data']) {
    const data = [];

    if (payload?.data?.length > 0 && payload?.included?.length > 0) {
      for (const item of payload?.data) {
        const introducerIds = item.attributes.introducer_ids;
        const introducessId = item?.relationships.introducee?.data?.id;
        let introducee = null;
        const introducers = [];

        for (const itemIncluded of payload?.included) {
          if (itemIncluded?.type === 'users') {
            if (itemIncluded?.id === introducessId) {
              introducee = itemIncluded;
            }

            if (introducerIds.includes(+itemIncluded?.id)) {
              introducers.push(itemIncluded);
            }
          }
        }

        item.introducee = introducee;
        item.introducers = introducers;
        data.push(item);
      }
    }
    return {...payload, data: data};
  }
}
