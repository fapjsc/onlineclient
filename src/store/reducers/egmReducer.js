import { egmActionTypes, cashInActionTypes } from '../types';

// Brand
const brandState = {
  isLoading: false,
  data: null,
  error: '',
};

export const brandReducer = (state = brandState, action) => {
  switch (action.type) {
  case egmActionTypes.SETUP_BRAND_LIST_BEGIN:
    return {
      isLoading: true,
      data: null,
      error: '',
    };

  case egmActionTypes.SETUP_BRAND_LIST_SUCCESS:
    return {
      isLoading: false,
      data: action.payload.brandList,
      error: '',
    };

  case egmActionTypes.SETUP_BRAND_LIST_ERROR:
    return {
      isLoading: false,
      data: null,
      error: action.payload.error,
    };

  case egmActionTypes.CLEAR_BRAND_LIST_STATUS:
    return brandState;

  default:
    return state;
  }
};

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

  case egmActionTypes.UPDATE_EGM:
    return {
      isLoading: false,
      data: action.payload.egmList,
      error: '',
    };

  case egmActionTypes.CLEAR_EGM_LIST_STATUS:
    return emgListState;

  default:
    return state;
  }
};

// Select Egm
const selectEgmState = {
  isLoading: false,
  data: null,
  error: '',
  currentBtnPress: null,
};

export const selectEgmReducer = (state = selectEgmState, action) => {
  switch (action.type) {
  case egmActionTypes.SETUP_SELECT_EGM_BEGIN:
    return {
      ...state,
      isLoading: true,
      data: null,
      error: '',
    };

  case egmActionTypes.SETUP_SELECT_EGM_SUCCESS:
    return {
      ...state,
      isLoading: false,
      data: action.payload.selectEgm,
      error: '',
    };

  case egmActionTypes.SETUP_SELECT_EGM_ERROR:
    return {
      ...state,
      isLoading: false,
      data: null,
      error: action.payload.error,
    };

  case egmActionTypes.SETUP_CURRENT_BTN_PRESS:
    return {
      ...state,
      currentBtnPress: action.payload.currentBtnCode,
    };

  case egmActionTypes.CLEAR_SELECT_EGM_DATA:
    return selectEgmState;

  default:
    return state;
  }
};

export const egmStatusReducer = (state = {}, action) => {
  switch (action.type) {
  case egmActionTypes.IS_PLAYING:
    return {
      isPlaying: action.payload.egmStatus,
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

  case egmActionTypes.CLEAR_BUTTON_PRESS_STATUS:
    return buttonPressState;

  default:
    return state;
  }
};

const bookingListState = {
  data: 'none',
};
export const bookingListReducer = (state = bookingListState, action) => {
  switch (action.type) {
  case egmActionTypes.BOOKING_LIST_SUCCESS:
    return {
      data: action.payload,
    };
  case egmActionTypes.BOOKING_LIST_ERROR:
    return {
      data: action.payload,
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

  case egmActionTypes.CLEAR_CASH_IN_OUT_STATUS:
    return cashInOutState;

  default:
    return state;
  }
};

const aftFormData = {
  data: null,
};

export const aftFormReducer = (state = aftFormData, action) => {
  switch (action.type) {
  case egmActionTypes.SET_AFT_FORM:
    return {
      data: action.payload.formData,
    };

  case egmActionTypes.CLEAR_AFT_FORM:
    return aftFormData;
  default:
    return state;
  }
};

// Leave Egm
const leaveEgmState = {
  isLoading: false,
  data: null,
  error: '',
};

export const leaveEgmReducer = (state = leaveEgmState, action) => {
  switch (action.type) {
  case egmActionTypes.LEAVE_EGM_BEGIN:
    return {
      isLoading: true,
      data: null,
      error: '',
    };

  case egmActionTypes.LEAVE_EGM_SUCCESS:
    return {
      isLoading: false,
      data: action.payload.leaveEgm,
      error: '',
    };

  case egmActionTypes.LEAVE_EGM_ERROR:
    return {
      isLoading: false,
      data: null,
      error: action.payload.error,
    };

  case egmActionTypes.LEAVE_EGM_CLEAR:
    return {
      isLoading: false,
      data: null,
      error: '',
    };

  default:
    return state;
  }
};

// Cash in
const cashInState = {
  isLoading: false,
  data: null,
  error: '',
};

export const cashInReducer = (state = cashInState, action) => {
  switch (action.type) {
  case cashInActionTypes.CASH_IN_BEGIN:
    return {
      isLoading: true,
      data: null,
      error: '',
    };

  case cashInActionTypes.CASH_IN_SUCCESS:
    return {
      isLoading: false,
      data: action.payload,
      error: '',
    };

  case cashInActionTypes.CASH_IN_ERROR:
    return {
      isLoading: false,
      data: null,
      error: action.payload,
    };
  default:
    return state;
  }
};
