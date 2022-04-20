import { userActionTypes } from '../types';

const initialState = {
  isLoading: false,
  data: null,
  error: '',
  currentAction: 'home',
  socketOnline: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case userActionTypes.SETUP_USER_BEGIN:
    return {
      ...state,
      isLoading: true,
      data: null,
      error: '',
    };

  case userActionTypes.SETUP_USER_SUCCESS:
    return {
      ...state,
      isLoading: false,
      data: action.payload.userData,
      error: '',
    };

  case userActionTypes.SETUP_USER_ERROR:
    return {
      ...state,
      isLoading: false,
      data: null,
      error: action.payload.error,
    };

  case userActionTypes.SET_CURRENT_ACTION:
    return {
      ...state,
      currentAction: action.payload.currentAction,
    };

  case userActionTypes.SETUP_SOCKET_STATUS:
    return {
      ...state,
      socketOnline: action.payload.socketStatus,
    };

  case userActionTypes.UPDATE_ONLINE:
    console.log(action.payload);
    return {
      ...state,
      data: {
        ...state.data,
        online: action.payload.onlineData,
      },
    };
  default:
    return state;
  }
};

const cryptoState = {
  isLoading: false,
  data: null,
  error: '',
};

export const cryptoReducer = (state = cryptoState, action) => {
  switch (action.type) {
  case userActionTypes.SETUP_CRYPTO_BEGIN:
    return {
      isLoading: true,
      data: null,
      error: '',
    };

  case userActionTypes.SETUP_CRYPTO_SUCCESS:
    return {
      isLoading: false,
      data: action.payload.crypto,
      error: '',
    };

  case userActionTypes.SETUP_CRYPTO_ERROR:
    return {
      isLoading: false,
      data: null,
      error: action.payload.error,
    };

  case userActionTypes.CLEAR_CRYPTO_STATUS:
    return cryptoState;
  default:
    return state;
  }
};

export default userReducer;
