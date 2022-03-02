import { egmActionTypes } from '../types';

// Get Egm List
const emgListState = {
  isLoading: false,
  data: null,
  error: '',
};

export const egmListReducer = (state = emgListState, action) => {
  switch (action.type) {
    case egmActionTypes.SETUP_EGM_LIST_BEGIN:
      return {
        isLoading: true,
        data: null,
        error: '',
      };

    case egmActionTypes.SETUP_EGM_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.payload.egmList,
        error: '',
      };

    case egmActionTypes.SETUP_EGM_LIST_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Select Egm
const selectEgmState = {
  isLoading: false,
  data: null,
  error: '',
};

export const selectEgmReducer = (state = selectEgmState, action) => {
  switch (action.type) {
    case egmActionTypes.SETUP_SELECT_EGM_BEGIN:
      return {
        isLoading: true,
        data: null,
        error: '',
      };

    case egmActionTypes.SETUP_SELECT_EGM_SUCCESS:
      return {
        isLoading: false,
        data: action.payload.selectEgm,
        error: '',
      };

    case egmActionTypes.SETUP_SELECT_EGM_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.payload.error,
      };

    case egmActionTypes.CLEAR_SELECT_EGM_DATA:
      return {
        selectEgmState,
      };

    default:
      return state;
  }
};

// Button Press
const buttonPressState = {
  isLoading: false,
  data: null,
  error: '',
};
export const egmButtonPressReducer = (state = buttonPressState, action) => {
  switch (action.type) {
    case egmActionTypes.BUTTON_PRESS_BEGIN:
      return {
        isLoading: true,
        data: null,
        error: '',
      };

    case egmActionTypes.BUTTON_PRESS_SUCCESS:
      return {
        isLoading: false,
        data: action.payload.buttonPressData,
        error: '',
      };

    case egmActionTypes.BUTTON_PRESS_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

// Egm Cash in out
const cashInOutState = {
  isLoading: false,
  data: null,
  error: '',
};

export const cashInOutReducer = (state = cashInOutState, action) => {
  switch (action.type) {
    case egmActionTypes.CASH_IN_OUT_BEGIN:
      return {
        isLoading: true,
        data: null,
        error: '',
      };

    case egmActionTypes.CASH_IN_OUT_SUCCESS:
      return {
        isLoading: false,
        data: action.payload.cashInOutData,
        error: '',
      };

    case egmActionTypes.CASH_IN_OUT_ERROR:
      return {
        isLoading: false,
        data: null,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
