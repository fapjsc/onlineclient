import { japanSlotActionsTypes } from '../types';

export const setJapanSlotPoint = (data) => ({
  type: japanSlotActionsTypes.SET_POINT,
  payload: data,
});

export const cleanJapanSlotState = () => ({
  type: japanSlotActionsTypes.CLEAN_STATUS,
});
