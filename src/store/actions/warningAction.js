import { warningActionTypes } from '../types';
// eslint-disable-next-line import/no-cycle
import { axiosFetch } from '../../config/axiosConfig';
import { agentServer, previousPlatformApi } from '../../apis';
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

export const storePreviousUrl = (url) => ({
  type: warningActionTypes.STORE_URL,
  payload: url,
});

export const getPrevUrl = () => async (dispatch) => {
  try {
    const { data } = await axiosFetch.get(
      `${agentServer.api}/${previousPlatformApi.platform}/${previousPlatformApi.return_url}/${1}`,
    );
    console.log('prev api =>', data, dispatch);
    dispatch(storePreviousUrl(data.result.url));
  } catch {
    //pass
    dispatch(storePreviousUrl('/home'));
  }
};
