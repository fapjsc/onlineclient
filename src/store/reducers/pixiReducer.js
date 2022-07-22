import { pixiActionTypes } from '../types';

const pixiState = {
  show: false,
};
export const pixiReducer = (state = pixiState, action) => {
  switch (action.type) {
  case pixiActionTypes.STATUS_ON:
    return {
      action: true,
      slotType: action.payload,
    };

  case pixiActionTypes.STATUS_OFF:
    return {
      action: false,
    };

  default:
    return state;
  }
};
