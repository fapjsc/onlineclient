import { pixiActionTypes } from '../types';

export const setPixiStatus = (status, slotType = null) => {
  if (status) {
    return { type: pixiActionTypes.STATUS_ON, payload: slotType };
  }
  return { type: pixiActionTypes.STATUS_OFF };
};
