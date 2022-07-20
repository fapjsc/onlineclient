import { pixiActionTypes } from '../types';

export const setPixiStatus = (status) => {
  if (status) {
    return { type: pixiActionTypes.STATUS_ON };
  }
  return { type: pixiActionTypes.STATUS_OFF };
};
