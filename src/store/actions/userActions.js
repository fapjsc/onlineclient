// import { axios } from '../../config/axiosConfig';
import axios from 'axios';

import { userActionTypes, rootActionTypes } from '../types';

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

    dispatch({
      type: userActionTypes.CLEAR_CRYPTO_STATUS,
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
      payload: { crypto: result.key },
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

export const setCurrentAction = (currentAction) => ({
  type: userActionTypes.SET_CURRENT_ACTION,
  payload: { currentAction },
});

// User在game play 開洗分後更新 point
export const updateOnline = ({ onlineData }) => ({
  type: userActionTypes.UPDATE_ONLINE,
  payload: { onlineData },
});

export const logout = () => ({ type: rootActionTypes.RESET_STORE });
