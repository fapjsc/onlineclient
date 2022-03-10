import axios from 'axios';
import { Dialog } from 'antd-mobile';
import { store } from '../store';
import { rootActionTypes } from '../store/types';

const { CancelToken } = axios;
let requestQueue = [];

// request攔截
const handleRequest = ({ config }) => {
  // 抽取四個參數不同於其他的請求
  const {
    url, method, data = {}, params = {},
  } = config;
  const jData = JSON.stringify(data);
  const jParams = JSON.stringify(params);

  const pending = requestQueue.filter(
    (item) => item.url === url
      && item.method === method
      && item.data === jData
      && item.params === jParams,
  );
  if (pending.length) {
    // 這裡是重點，實例化CancelToken時，對參數c立即進行調用，立即取消當前請求
    config.cancelToken = new CancelToken((c) => c(429));
    // config.cancelToken = new CancelToken(c => c(`重複的請求被主動攔截: ${url} + ${jData} + ${jParams}`))
  } else {
    // 如果請求不存在，將數據轉為JSON後面比較好比對
    requestQueue.push({
      url,
      data: jData,
      params: jParams,
      method,
    });
  }
};

// response 攔截
const handleResponse = ({ config }) => {
  const {
    url,
    data = JSON.stringify({}),
    params = JSON.stringify({}),
  } = config;
  const reqQueue = requestQueue.filter(
    (item) => item.url !== url && item.data !== data && item.params !== params,
  );
  requestQueue = reqQueue;
};

export const authFetch = axios.create({
  baseURL: '/online',
});

authFetch.interceptors.request.use(
  (config) => {
    const token = store.getState()?.user?.data?.token || '';
    config.headers.common.Authorization = `Bearer ${token}`;

    handleRequest({ config });
    return config;
  },
  (error) => Promise.reject(error),
);

authFetch.interceptors.response.use(
  (response) => {
    handleResponse({ config: response.config });
    return response;
  },
  (error) => {
    const { response } = error;
    // 這裡統一處理429和401錯誤
    // 目前僅先定義401錯誤
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
