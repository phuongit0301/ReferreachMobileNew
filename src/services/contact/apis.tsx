/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';

import * as API from '~Root/private/api';

export default class ContactAPI {
  static async inviteUserContact(payload: any) {
    try {
      const response = await axios({
        method: 'post',
        url: API.INVITE_USER_CONTACT_URL,
        data: {
          contacts_list: payload,
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response?.status === 200 || response?.status === 201) {
        return {
          data: response.data,
          message: '',
          success: true,
        };
      }
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }
}
