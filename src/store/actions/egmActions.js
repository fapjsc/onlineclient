import { authFetch, axiosFetch } from '../../config/axiosConfig';

import { egmAPi, agentServer } from '../../apis';

// eslint-disable-next-line
import { egmActionTypes, userActionTypes } from '../types';

// Get Egm List
export const getEgmList = () => async (dispatch) => {
  dispatch({ type: egmActionTypes.SETUP_EGM_LIST_BEGIN });

  try {
    const { data } = await axiosFetch.get(
      `${agentServer.api}/${egmAPi.getEgmList}`,
    );

    dispatch({
      type: egmActionTypes.SETUP_EGM_LIST_SUCCESS,
      payload: { egmList: data.result },
    });
  } catch (error) {
    const { response } = error;
    // ˋ401 => 身份驗證失敗
    //  429 => 重複請求
    //  以上兩種錯誤統一在axios config 處理
    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.SETUP_EGM_LIST_ERROR,
        payload: {
          error: response?.data?.message || 'get egm list fail',
        },
      });
    }
  }
};

// Get Brand List
export const getBrandList = () => async (dispatch) => {
  dispatch({ type: egmActionTypes.SETUP_BRAND_LIST_BEGIN });

  try {
    const { data } = await axiosFetch.get(
      `${agentServer.api}/${egmAPi.getBrandList}`,
    );

    dispatch({
      type: egmActionTypes.SETUP_BRAND_LIST_SUCCESS,
      payload: { brandList: data.result },
    });
  } catch (error) {
    const { response } = error;
    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.SETUP_BRAND_LIST_ERROR,
        payload: {
          error: response?.data?.message || 'get brand list fail',
        },
      });
    }
  }
};

// Select Egm
export const selectEgm = (id) => async (dispatch) => {
  dispatch({ type: egmActionTypes.SETUP_SELECT_EGM_BEGIN });

  try {
    const { data } = await authFetch.post(
      `${agentServer.api}/${egmAPi.selectEgm}`,
      { id },
    );

    dispatch({
      type: egmActionTypes.SETUP_SELECT_EGM_SUCCESS,
      payload: { selectEgm: data.result },
    });
  } catch (error) {
    const { response } = error;
    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.SETUP_SELECT_EGM_ERROR,
        payload: {
          error: response?.data?.message || 'select egm fail',
        },
      });
    }
  }
};

// Button Press
export const buttonPress = ({ ip, code, name }) => async (dispatch) => {
  dispatch({ type: egmActionTypes.BUTTON_PRESS_BEGIN });

  try {
    const { data } = await authFetch.post(
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
    const { response } = error;
    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.BUTTON_PRESS_ERROR,
        payload: {
          error: response?.data?.message || 'button press fail',
        },
      });
    }
  }
};

// 吉宗，拳王測試
export const buttonPressDemo = ({ ip, code, name }) => async (dispatch) => {
  dispatch({ type: egmActionTypes.BUTTON_PRESS_BEGIN });

  try {
    const { data } = await authFetch.post(
        `${agentServer.api}/${egmAPi.egmPressButtonDemo}`,
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
    const { response } = error;
    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.BUTTON_PRESS_ERROR,
        payload: {
          error: response?.data?.message || 'button press fail',
        },
      });
    }
  }
};

export const cashInOut = ({
  onlineId, ip, cashAmount, type, chipType,
}) => async (dispatch) => {
  dispatch({ type: egmActionTypes.CASH_IN_OUT_BEGIN });

  try {
    let url;
    if (type === 'aft-in') {
      url = `${agentServer.api}/${egmAPi.aftIn}`;
    }

    if (type === 'aft-out') {
      url = `${agentServer.api}/${egmAPi.aftOut}`;
    }
    const { data } = await authFetch.post(url, {
      onlineId,
      ip,
      cashAmount,
      type: chipType,
    });

    dispatch({
      type: egmActionTypes.CASH_IN_OUT_SUCCESS,
      payload: { cashInOutData: data.result },
    });

    // dispatch({
    //   type: userActionTypes.UPDATE_ONLINE,
    //   payload: { onlineData: data.result },
    // });
  } catch (error) {
    if (error?.message === 'fetchTimeout') {
      dispatch({
        type: egmActionTypes.CASH_IN_OUT_ERROR,
        payload: {
          error: '請求超時',
        },
      });
      return;
    }

    const { response } = error || {};

    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.CASH_IN_OUT_ERROR,
        payload: {
          error: response?.data?.message || 'cash in out fail',
        },
      });
    }
  }
};

export const setAftFormData = (formData) => ({
  type: egmActionTypes.SET_AFT_FORM,
  payload: { formData },
});

// Clear Status
export const clearSelectEgmData = () => ({
  type: egmActionTypes.CLEAR_SELECT_EGM_DATA,
});

export const clearButtonPressStatus = () => ({
  type: egmActionTypes.CLEAR_BUTTON_PRESS_STATUS,
});

export const clearCashInOutStatus = () => ({
  type: egmActionTypes.CLEAR_CASH_IN_OUT_STATUS,
});

export const clearAftForm = () => ({
  type: egmActionTypes.CLEAR_AFT_FORM,
});
