/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from '~Root/services/axios';
import i18n from 'i18next';

import * as API from '~Root/private/api';
import {IActionAllIndustriesRequested, IIndustry, IIndustrySave} from './types';
import {IUserInfoState} from '~Root/services/user/types';
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

  static async getAllIndustries(payload: string) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.GET_ALL_INDUSTRIES_URL}?search_value=${payload || ''}`,
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

  static async filterDataIndustry({
    target = 1,
    industries = [],
    userInfo,
  }: {
    target: number;
    industries: IIndustry[] | IIndustrySave[];
    userInfo: IUserInfoState;
  }) {
    const items: IIndustry[] | IIndustrySave[] = [];
    if (industries?.length > 0 && userInfo) {
      if (target === 1 && userInfo?.self_industries?.length > 0) {
        industries.forEach((x: IIndustry | IIndustrySave) => {
          const isExists = userInfo?.self_industries.some(
            (y: IIndustry | IIndustrySave) => y?.name?.toLowerCase() === x?.attributes?.search_data?.toLowerCase(),
          );
          if (!isExists) {
            items.push({id: x.id, name: x?.attributes?.search_data});
          }
        });
      }

      if (target === 2 && userInfo?.sell_industries?.length > 0) {
        industries.forEach((x: IIndustry | IIndustrySave) => {
          const isExists = userInfo?.sell_industries.some(
            (y: IIndustry | IIndustrySave) => y?.name.toLowerCase() === x?.attributes?.search_data?.toLowerCase(),
          );
          if (!isExists) {
            items.push({id: x.id, name: x?.attributes?.search_data});
          }
        });
      }

      if (target === 3 && userInfo?.partner_industries?.length > 0) {
        industries.forEach((x: IIndustry | IIndustrySave) => {
          const isExists = userInfo?.partner_industries.some(
            (y: IIndustry | IIndustrySave) => y?.name.toLowerCase() === x?.attributes?.search_data?.toLowerCase(),
          );
          if (!isExists) {
            items.push({id: x.id, name: x?.attributes?.search_data});
          }
        });
      }
    }
    return items;
  }
}
