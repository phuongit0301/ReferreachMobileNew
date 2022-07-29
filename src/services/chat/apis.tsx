/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {IActionChatOneOnOneRequested, IActionOnUpdateChatContextRequested, IIncluded} from './types';
export default class ChatAPI {
  static async getUserChatList() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.USER_CHAT_LIST_URL,
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

  static async getChatPersonal() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_PERSONAL_URL,
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

  static async onChatOneOnOne(payload: IActionChatOneOnOneRequested['payload']) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.ON_CHAT_ONE_ON_ONE_URL,
        params: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response11111=====>', response);
      if (response && (response.status === 200 || response.status === 201)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      console.log('response11111=====>', error);
      return {
        data: null,
        message: error,
        success: false,
      };
    }
  }

  static async onUpdateChatContext(payload: IActionOnUpdateChatContextRequested['payload']) {
    try {
      console.log('payload=====>', payload);
      const response = await axios({
        method: 'PUT',
        url: API.ON_UPDATE_CHAT_CONTEXT_URL(payload?.contextId),
        params: JSON.stringify(payload?.lastMessage),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && (response.status === 200 || response.status === 201)) {
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

  static async getChatFeed() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_FEED_URL,
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

  static async getChatContext(payload: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: API.CHAT_CONTEXT_URL(payload),
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

  static async onPin(payload: string) {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.ON_PIN_URL(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response && (response.status === 200 || response.status === 204)) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error: any) {
      console.log('error========>', JSON.stringify(error));
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

  static async onUnPin(payload: string) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: API.ON_UN_PIN_URL(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && (response.status === 200 || response.status === 204)) {
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

  static async handleUserReceive(params: any) {
    return params?.arrUser.find((x: IIncluded) => +x.id !== +params?.currentUserId);
  }
}
