import { menuActionTypes } from '../types';

const initialState = {
  currentMenu: '',
};

export const menuReducer = (state = initialState, action) => {
  switch (action.type) {
  case menuActionTypes.SET_CURRENT_MENU:
    return {
      ...state,
      currentMenu: action.payload,
    };
  default:
    return state;
  }
};

export const temp = () => {};
