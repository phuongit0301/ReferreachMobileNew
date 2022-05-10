/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
export default class IndustryAPI {
  static async getIndustry() {
    try {
      const response = await axios({
        method: 'GET',
        url: API.MATCHES_URL,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response && response.status !== 200) {
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

  static async getAllIndustries() {
    return {
      // data: response.data,
      data: ['Utilities', 'Cyber Securities', 'Fashion', 'Fast-moving consumer', 'goods', 'Film', 'Finance'],
      message: '',
      success: true,
    };
    // try {
    //   const response = await axios({
    //     method: 'GET',
    //     url: API.GET_ALL_INDUSTRIES_URL,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   });
    //   if (response?.data) {
    //     return {
    //       // data: response.data,
    //       data: ['Utilities', 'Cyber Securities', 'Fashion', 'Fast-moving consumer', 'goods', 'Film', 'Finance'],
    //       message: '',
    //       success: true,
    //     };
    //   }
    // } catch (error) {
    //   return {
    //     data: null,
    //     message: error,
    //     success: false,
    //   };
    // }
  }
}
