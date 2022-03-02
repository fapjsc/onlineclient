import axios from 'axios';

import { egmAPi, agentServer } from '../../apis';

import { egmActionTypes, userActionTypes } from '../types';

// Get Egm List
export const getEgmList = () => async (dispatch) => {
  dispatch({ type: egmActionTypes.SETUP_EGM_LIST_BEGIN });

  try {
    const { data } = await axios.get(`${agentServer.api}/${egmAPi.getEgmList}`);

    dispatch({
      type: egmActionTypes.SETUP_EGM_LIST_SUCCESS,
      payload: { egmList: data.result },
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: egmActionTypes.SETUP_EGM_LIST_ERROR,
      payload: {
        error: error.response.data.message || error.response.data.error,
      },
    });
  }
};

// Select Egm
export const selectEgm = (id) => async (dispatch) => {
  dispatch({ type: egmActionTypes.SETUP_SELECT_EGM_BEGIN });
  try {
    const { data } = await axios.post(
      `${agentServer.api}/${egmAPi.selectEgm}`,
      { id },
    );
    dispatch({
      type: egmActionTypes.SETUP_SELECT_EGM_SUCCESS,
      payload: { selectEgm: data.result },
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: egmActionTypes.SETUP_SELECT_EGM_ERROR,
      payload: {
        error: error.response.data.message || error.response.data.error,
      },
    });
  }
};

export const clearSelectEgmData = () => ({
  type: egmActionTypes.CLEAR_SELECT_EGM_DATA,
});

// Button Press
export const buttonPress = ({ ip, code, name }) => async (dispatch) => {
  dispatch({ type: egmActionTypes.BUTTON_PRESS_BEGIN });

  try {
    const { data } = await axios.post(
      `${agentServer.api}/${egmAPi.buttonPress}`,
      {
        ip,
        code,
        name,
      },
    );

    dispatch({
      type: egmActionTypes.BUTTON_PRESS_SUCCESS,
      payload: { buttonPressData: data.message },
    });
  } catch (error) {
    dispatch({
      type: egmActionTypes.BUTTON_PRESS_ERROR,
      payload: {
        error: error.response.data.message || error.response.data.error,
      },
    });
  }
};

export const cashInOut = ({
  onlineId, ip, cashAmount, type,
}) => async (dispatch) => {
  dispatch({ type: egmActionTypes.CASH_IN_OUT_BEGIN });

  try {
    let url;

    if (type === 'cash-in') {
      url = `${agentServer.api}/${egmAPi.aftIn}`;
    }

    if (type === 'cash-out') {
      url = `${agentServer.api}/${egmAPi.aftOut}`;
    }

    const { data } = await axios.post(url, {
      onlineId,
      ip,
      cashAmount,
    });

    console.log(data);

    dispatch({
      type: egmActionTypes.CASH_IN_OUT_SUCCESS,
      payload: { cashInOutData: data.result },
    });

    dispatch({
      type: userActionTypes.UPDATE_ONLINE,
      payload: { onlineData: data.result },
    });
  } catch (error) {
    dispatch({
      type: egmActionTypes.CASH_IN_OUT_ERROR,
      payload: {
        error: error.response.data.message || error.response.data.error,
      },
    });
  }
};
