import axios from 'axios';

const authFetch = axios.create({
  baseURL: '/api/v1',
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common['login_session'] = `${state.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response);
    if (error.response.code === 91) {
      alert('logout');
    }
    return Promise.reject(error);
  },
);

export default authFetch;
