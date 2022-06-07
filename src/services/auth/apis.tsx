import base64 from 'react-native-base64';

import {getToken} from '~Root/services/storage';
import {IVerifyToken} from './types';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthAPI {
  static async verifyToken(): Promise<IVerifyToken> {
    const token = await getToken();
    let isExpired = true;

    if (token) {
      const spl = token.split('.')[1];
      const decode = base64.decode(spl);
      isExpired = +decode.exp * 1000 > new Date().getTime();
    }
    return {
      success: (isExpired && !token) ? false : true,
      payload: token,
    };
  }
}
