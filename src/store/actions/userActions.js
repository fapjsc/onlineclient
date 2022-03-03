import axios from 'axios';

import { userActionTypes } from '../types';

import { agentServer, authApi } from '../../apis';

// const addUserToLocalStorage = ({ user, token, location }) => {
//   localStorage.setItem('user', JSON.stringify(user));
//   localStorage.setItem('token', token);
//   localStorage.setItem('location', location);
// };

export const setupUser = ({ currentUser, endPoint }) => async (dispatch) => {
  dispatch({ type: userActionTypes.SETUP_USER_BEGIN });

  try {
    const { data } = await axios.post(
      `${agentServer.api}/${endPoint}`,
      currentUser,
    );

    const { result } = data || {};

    dispatch({
      type: userActionTypes.SETUP_USER_SUCCESS,
      payload: { userData: result },
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.SETUP_USER_ERROR,
      payload: {
        error: error?.response?.data?.message || 'setup uer fail',
      },
    });
  }
};

export const getCrypto = () => async (dispatch) => {
  dispatch({ type: userActionTypes.SETUP_CRYPTO_BEGIN });

  try {
    const { data } = await axios.get(`${agentServer.api}/${authApi.getKey}`);

    const { result } = data || {};

    dispatch({
      type: userActionTypes.SETUP_CRYPTO_SUCCESS,
      payload: { crypto: result },
    });
  } catch (error) {
    dispatch({
      type: userActionTypes.SETUP_CRYPTO_ERROR,
      payload: {
        error: error?.response?.data?.message || 'get crypto key fail',
      },
    });
  }
};

export const updateOnline = ({ onlineData }) => ({
  type: userActionTypes.UPDATE_ONLINE,
  payload: { onlineData },
});
