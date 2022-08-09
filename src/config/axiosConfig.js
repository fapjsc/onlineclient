import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/actions/userActions';
import { showWarningWindow } from '../store/actions/warningAction';

// import { rootActionTypes } from '../store/types';

const { CancelToken } = axios;
let requestQueue = [];

// request攔截調用
const handleRequest = ({ config }) => {
  if (!config) return;

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
    // 這裡是重點，實例化CancelToken時，對參數c立即進行調用，取消當前請求
    config.cancelToken = new CancelToken((c) => c(429)); // 429 => 重複請求的錯誤碼
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

// response攔截調用
const handleResponse = ({ config }) => {
  if (!config) return;
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
  timeout: 1000 * 60,
  timeoutErrorMessage: 'fetchTimeout',
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
    handleResponse({ config: response?.config });
    return response;
  },
  (error) => {
    // 超時
    // if (error.message === 'fetchTimeout') {
    //   handleResponse({ config: error?.config });
    // }

    const { response } = error;

    // error.config => 超時錯誤處理
    handleResponse({ config: response?.config || error?.config });
    // 這裡統一處理429和401錯誤
    // 目前僅先定義401錯誤
    if (response?.status === 401) {
      //can not reslove it
      store.dispatch(showWarningWindow('on', 'warning', () => store.dispatch(logout()), '無效的TOKEN', '重新登入'));
    }

    return Promise.reject(error);
  },
);

export const axiosFetch = axios.create({
  baseURL: '/online',
  timeout: 1000 * 60,
  timeoutErrorMessage: 'fetchTimeout',
});

axiosFetch.interceptors.request.use(
  (config) => {
    handleRequest({ config });
    return config;
  },
  (error) => Promise.reject(error),
);

axiosFetch.interceptors.response.use(
  (response) => {
    handleResponse({ config: response?.config });
    return response;
  },
  (error) => {
    // 超時
    // if (error.message === 'fetchTimeout') {
    //   handleResponse({ config: error?.config });
    // }

    const { response } = error;
    // error.config => 超時錯誤處理
    handleResponse({ config: response?.config || error?.config });
    return Promise.reject(error);
  },
);
