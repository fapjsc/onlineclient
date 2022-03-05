export const userActionTypes = {
  SETUP_USER_BEGIN: 'SETUP_USER_BEGIN ',
  SETUP_USER_SUCCESS: 'SETUP_USER_SUCCESS ',
  SETUP_USER_ERROR: 'SETUP_USER_ERROR ',
  UPDATE_ONLINE: 'UPDATE_ONLINE',
  SET_CURRENT_ACTION: 'SET_CURRENT_ACTION',

  // Crypto
  SETUP_CRYPTO_BEGIN: 'SETUP_CRYPTO_BEGIN ',
  SETUP_CRYPTO_SUCCESS: 'SETUP_CRYPTO_SUCCESS ',
  SETUP_CRYPTO_ERROR: 'SETUP_CRYPTO_ERROR ',
  CLEAR_CRYPTO_STATUS: 'CLEAR_CRYPTO_STATUS',
};

export const egmActionTypes = {
  // Get Egm List
  SETUP_EGM_LIST_BEGIN: 'SETUP_EGM_LIST_BEGIN ',
  SETUP_EGM_LIST_SUCCESS: 'SETUP_EGM_LIST_SUCCESS ',
  SETUP_EGM_LIST_ERROR: 'SETUP_EGM_LIST_ERROR ',

  // Get Brand List
  SETUP_BRAND_LIST_BEGIN: 'SETUP_BRAND_LIST_BEGIN ',
  SETUP_BRAND_LIST_SUCCESS: 'SETUP_BRAND_LIST_SUCCESS ',
  SETUP_BRAND_LIST_ERROR: 'SETUP_BRAND_LIST_ERROR ',

  // Select Egm
  SETUP_SELECT_EGM_BEGIN: 'SETUP_SELECT_EGM_BEGIN ',
  SETUP_SELECT_EGM_SUCCESS: 'SETUP_SELECT_EGM_SUCCESS ',
  SETUP_SELECT_EGM_ERROR: 'SETUP_EGM_LIST_ERROR ',
  CLEAR_SELECT_EGM_DATA: 'CLEAR_SELECT_EGM_DATA',

  // Button Press
  BUTTON_PRESS_BEGIN: 'BUTTON_PRESS_BEGIN',
  BUTTON_PRESS_SUCCESS: 'BUTTON_PRESS_SUCCESS',
  BUTTON_PRESS_ERROR: 'BUTTON_PRESS_ERROR',
  CLEAR_BUTTON_PRESS_STATUS: 'CLEAR_BUTTON_PRESS_STATUS',

  // Cash in Out
  CASH_IN_OUT_BEGIN: 'CASH_IN_OUT_BEGIN',
  CASH_IN_OUT_SUCCESS: 'CASH_IN_OUT_SUCCESS',
  CASH_IN_OUT_ERROR: 'CASH_IN_OUT_ERROR',
  CLEAR_CASH_IN_OUT_STATUS: 'CLEAR_CASH_IN_OUT_STATUS',
};

export const rootActionTypes = {
  RESET_STORE: 'RESET_STORE',
};
