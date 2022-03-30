import { menuActionTypes } from '../types';

export const setCurrentMenu = (value) => ({
  type: menuActionTypes.SET_CURRENT_MENU,
  payload: value,
});

export const temp = () => {};
