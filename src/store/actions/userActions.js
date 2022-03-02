import axios from 'axios';

import { userActionTypes } from '../types';

import { agentServer } from '../../apis';

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

    // const {
    //   id, token, member_id: memberID, cards,
    // } = result;

    // const userData = {
    //   id,
    //   token,
    //   memberID,
    //   cards,
    // };

    console.log(result);
    dispatch({
      type: userActionTypes.SETUP_USER_SUCCESS,
      payload: { userData: result },
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: userActionTypes.SETUP_USER_ERROR,
      payload: {
        error: error.response.data.message || 'setup uer fail',
      },
    });
  }
};

export const updateOnline = ({ onlineData }) => ({
  type: userActionTypes.UPDATE_ONLINE,
  payload: { onlineData },
});
