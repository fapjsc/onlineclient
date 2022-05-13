export const agentServer = {
  api: process.env.REACT_APP_AGENT_API || 'http://220.135.67.240:8000/online',
  socketUrl: process.env.REACT_APP_AGENT_SOCKET || 'http://192.168.10.119:3030',
  // api: 'http://192.168.10.105:3030/online',
  // api: 'http://192.168.10.200:3030/online',
  // socketUrl: 'http://192.168.10.200:3030',
  // socketUrl: 'http://localhost:8081',
};

export const authApi = {
  getKey: 'getKey',
  login: 'login',
  landing: '88894168/autoLogin',
};

export const egmAPi = {
  getEgmList: 'egmList',
  selectEgm: 'selectEgm',
  buttonPress: 'egmPressButton',
  egmPressButtonDemo: 'demoPressButton', // 吉宗及拳王測試
  aftIn: 'aftIn',
  aftOut: 'aftOut',
  getBrandList: 'egmBrandList',
};

export const apiConfig = {
  // @File       Aristocrat.jsx
  // @Function   subBtnClickHandler
  // @desc       sub btn bet 類型發送api 及動畫時間
  betBtnTimeSpace: 500,

  // @File       Aristocrat.jsx
  // @Function   subBtnClickHandler
  // @desc       sub btn line 類型發送api 及動畫時間
  lineBtnTimeSpace: 3200,

  // @File       Aristocrat.jsx
  // @Function   mainBtnHandler  autoSpinHandler
  // @desc       發送main btn api 時間
  mainBtnApiTimeSpace: 3200,
};
