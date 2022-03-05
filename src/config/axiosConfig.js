import axios from 'axios';
import { Dialog } from 'antd-mobile';
import { store } from '../store';
import { rootActionTypes } from '../store/types';

export const authFetch = axios.create({
  baseURL: '/online',
});

authFetch.interceptors.request.use(
  (config) => {
    // config.headers.common.Authorization = `Bearer ${state.token}`;
    const token = store.getState()?.user?.data?.token || '';
    config.headers.common.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

authFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (!response) {
      Dialog.alert({
        content: '請稍後再試',
        confirmText: '確定',
      });
    }

    if (response?.status === 401) {
      Dialog.alert({
        content: '無效的TOKEN',
        confirmText: '重新登入',
        onConfirm: () => {
          store.dispatch({ type: rootActionTypes.RESET_STORE });
        },
      });
    }
    return Promise.reject(error);
  },
);

export const temp = () => {};
