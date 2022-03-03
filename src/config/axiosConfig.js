import axios from 'axios';
import { store } from '../store';

export const authFetch = axios.create({
  baseURL: '/online',
});

authFetch.interceptors.request.use(
  (config) => {
    // config.headers.common.Authorization = `Bearer ${state.token}`;
    config.headers.common.Authorization = `Bearer ${
      store.getState().user.data.token
    }`;
    return config;
  },
  (error) => Promise.reject(error),
);

authFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error.response);
    if (error.response.code === 91) {
      alert('logout');
    }
    return Promise.reject(error);
  },
);

export const temp = () => {};
