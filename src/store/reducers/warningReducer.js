import { warningActionTypes } from '../types';
/* eslint-disable import/prefer-default-export */
const warningState = {
  visible: false,
  propStatus: '',
  btnAction: '',
  windowText: '',
  btnText: '',
};
export const warningReducer = (state = warningState, action) => {
  switch (action.type) {
  case warningActionTypes.VISIBLE_ON:
    return {
      visible: true,
      propStatus: action.payload.propStatus,
      btnAction: action.payload.btnAction,
      windowText: action.payload.windowText,
      btnText: action.payload.btnText,
    };

  case warningActionTypes.VISIBLE_OFF:
    return {
      visible: false,
      propStatus: '',
      btnAction: '',
      windowText: '',
      btnText: '',
    };
  case warningActionTypes.WARNING_BTN_CLICK:
    return {
      visible: false,
      propStatus: '',
      btnAction: '',
      windowText: '',
      btnText: '',
    };
  default:
    return state;
  }
};

const previousUrlState = {
  previousUrl: null,
};

export const previousUrlReducer = (state = previousUrlState, action) => {
  switch (action.type) {
  case warningActionTypes.STORE_URL:
    return {
      previousUrl: action.payload,
    };
  default:
    return state;
  }
};
