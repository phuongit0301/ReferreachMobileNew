/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';
import {
  IActionChatOneOnOneRequested,
  IActionChatPersonalRequested,
  IActionOnPinRequested,
  IActionOnUnPinRequested,
  IActionOnUpdateChatContextRequested,
  IIncluded,
  IPaginationAndSearch,
} from './types';
export default class ChatAPI {
  static async getUserChatList(payload?: string) {
    try {
      let url = API.USER_CHAT_LIST_URL;
      if (payload) {
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

  static async getChatPersonal(payload: IActionChatPersonalRequested['payload']) {
    try {
      let params = '';
      if (payload) {
        params = Object.keys(payload)
          .map((key: string) => `${key}=${payload[key]}`)
          .join('&');
      }

      const response = await axios({
        method: 'GET',
        url: `${API.CHAT_PERSONAL_URL}?${params}`,
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
      const response = await axios({
        method: 'PUT',
        url: API.ON_UPDATE_CHAT_CONTEXT_URL(payload?.contextId),
        data: JSON.stringify({last_message_metadata: payload?.lastMessage?.last_message_metadata}),
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

  static async getChatFeed(payload: IPaginationAndSearch) {
    try {
      let params = '';
      if (payload) {
        params = Object.keys(payload)
          .map((key: string) => `${key}=${payload[key]}`)
          .join('&');
      }
      const response = await axios({
        method: 'GET',
        url: `${API.CHAT_FEED_URL}?${params}`,
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

  static async onPin(payload: IActionOnPinRequested['payload']) {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${API.ON_PIN_URL(payload?.pinnable_id)}?pinnable_type=${payload?.pinnable_type}`,
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

  static async onUnPin(payload: IActionOnUnPinRequested['payload']) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${API.ON_UN_PIN_URL(payload?.pinnable_id)}?pinnable_type=${payload?.pinnable_type}`,
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
    let introduction = null; //introducer or introducee
    let ask = null; //asks
    const users = [];
    let introducer = null;
    let introducee = null;
    let isIntroducer = false;
    let asker = null;
    let showKudos = false;
    let isAsker = false;

    for (const item of params?.arrUser) {
      if (item?.type === 'introductions') {
        introduction = item;
        if (!showKudos) {
          showKudos = item?.attributes?.kudos;
        }
      }

      if (item?.type === 'asks') {
        ask = item;
      }

      if (item?.type === 'users') {
        users.push(item);
      }
    }

    if (introduction && users.length > 0) {
      for (const item of users) {
        if (item.id === introduction?.relationships?.introducer?.data?.id) {
          isIntroducer = +params?.currentUserId === +introduction?.relationships?.introducer?.data?.id;
          introducer = item;
        } else if (item.id === introduction?.relationships?.introducee?.data?.id) {
          introducee = item;
        } else {
          if (!isAsker) {
            isAsker = +params?.currentUserId === +item.id;
          }
          asker = item;
        }
      }
    }

    return {introducer, introducee, asker, ask, isIntroducer, showKudos: showKudos && isAsker};
  }

  static async handleChatPersonalReceive(params: any) {
    return params?.arrUser.find((x: IIncluded) => +x.id !== +params?.currentUserId);
  }
}
