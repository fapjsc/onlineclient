import { authFetch, axiosFetch } from '../../config/axiosConfig';

import { egmAPi, agentServer } from '../../apis';

import { waitTime, asyncForEach } from '../../utils/helper';

// eslint-disable-next-line
import { egmActionTypes, userActionTypes, cashInActionTypes } from '../types';

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

export const upDateEgmData = (egmList) => ({
  type: egmActionTypes.UPDATE_EGM,
  payload: { egmList },
});

// Setup Egm Status
export const setIsPlaying = (egmStatus) => ({
  type: egmActionTypes.IS_PLAYING,
  payload: { egmStatus },
});

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

export const leaveEgm = ({ userToken }) => async (dispatch) => {
  dispatch({ type: egmActionTypes.LEAVE_EGM_BEGIN });

  try {
    const { data } = await authFetch.post(
        `${agentServer.api}/${egmAPi.leaveEgm}`,
        { token: userToken },
    );

    dispatch({
      type: egmActionTypes.LEAVE_EGM_SUCCESS,
      payload: { leaveEgm: data },
    });
  } catch (error) {
    const { response } = error;

    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: egmActionTypes.LEAVE_EGM_ERROR,
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
    alert(
      response
        ? `${response?.data.status}: ${response?.data.message}`
        : error,
    );
  }
};

export const sammyAutoPlay = ({ ip, codeList }) => async (dispatch) => {
  if (!ip || !codeList) return;

  dispatch({ type: egmActionTypes.BUTTON_PRESS_BEGIN });
  try {
    const url = `${agentServer.api}/${egmAPi.egmPressButtonDemo}`;

    asyncForEach(codeList, async (el, index) => {
      try {
        const { data } = await authFetch.post(url, { ip, code: el });

        if (index === codeList.length - 1) {
          dispatch({
            type: egmActionTypes.BUTTON_PRESS_SUCCESS,
            payload: { buttonPressData: data.message },
          });
          return;
        }

        await waitTime(1200);
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

        alert(
          response
            ? `${response?.data.status}: ${response?.data.message}`
            : error,
        );
        throw new Error(response?.data?.message);
      }
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

    alert(
      response
        ? `${response?.data.status}: ${response?.data.message}`
        : error,
    );
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

export const clearLeaveEgm = () => ({
  type: egmActionTypes.LEAVE_EGM_CLEAR,
});

// 直接 call 拳王 egm 投幣 (暫時)
export const buttonPressToEGMCashInOut = () => async (dispatch) => {
  const url = 'http://220.135.67.240:1880/slot/coin/enter';
  dispatch({ type: cashInActionTypes.CASH_IN_BEGIN });

  try {
    const { data } = await authFetch.get(url);

    dispatch({
      type: cashInActionTypes.CASH_IN_SUCCESS,
      payload: { buttonPressData: data.message },
    });
  } catch (error) {
    const { response } = error;

    if (response?.status !== 401 && error?.message !== 429) {
      dispatch({
        type: cashInActionTypes.CASH_IN_ERROR,
        payload: {
          error: response?.data?.message || 'button press fail',
        },
      });
    }

    alert(
      response ? `${response?.data.status}: ${response?.data.message}` : error,
    );
  }
};
