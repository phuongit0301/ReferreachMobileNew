import axios, {AxiosRequestConfig} from 'axios';
import AuthAPI from '~Root/services/auth/apis';
import {logout} from '~Root/services/auth/actions';
import rootStore from '~Root/store';

// Add a request interceptor
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const response = await AuthAPI.verifyToken();

    if (!config.headers) config.headers = {};

    if (response.success) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      if (response?.payload) {
        config.headers.Authorization = `Bearer ${response?.payload}`;
      } else {
        delete config.headers.Authorization;
      }
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  async (error: any) => {
    return await Promise.reject(error);
  },
);
// Add a response interceptor

axios.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    //   const originalRequest = error.config;
    console.log('error interceptor=======>', error);
    if (error?.response?.status === 401) {
      const {store} = rootStore();
      store.dispatch(logout());
      return Promise.reject(error);
    }

    //   if (error.response.status === 401 && !originalRequest._retry) {

    //     originalRequest._retry = true;
    //     const refreshToken = localStorageService.getRefreshToken();
    //     return axios.post('/auth/token',
    //       {
    //         "refresh_token": refreshToken
    //       })
    //       .then(res => {
    //         if (res.status === 201) {
    //           localStorageService.setToken(res.data);
    //           axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
    //           return axios(originalRequest);
    //         }
    //       })
    //   }
    //   return Promise.reject(error);
  },
);

export default axios;
