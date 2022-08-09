import { warningActionTypes } from '../types';
/* eslint-disable import/prefer-default-export */
export const showWarningWindow = (status, propStatus = 'warning', btnAction = (() => {}), windowText = '', btnText = '') => {
  if (status === 'on') {
    return {
      type: warningActionTypes.VISIBLE_ON,
      payload: {
        propStatus: propStatus,
        btnAction: btnAction,
        windowText: windowText,
        btnText: btnText,
      },
    };
  }
  return {
    type: warningActionTypes.VISIBLE_OFF,
  };
};
