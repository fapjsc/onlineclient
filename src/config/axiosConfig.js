import axios from 'axios';

export const authFetch = axios.create({
  baseURL: '/api/v1',
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common.login_session = '1234';
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
