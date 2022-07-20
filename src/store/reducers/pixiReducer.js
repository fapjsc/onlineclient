import { pixiActionTypes } from '../types';

const pixiState = {
  show: false,
};
export const pixiReducer = (state = pixiState, action) => {
  switch (action.type) {
  case pixiActionTypes.STATUS_ON:
    return {
      show: true,
    };

  case pixiActionTypes.STATUS_OFF:
    return {
      show: false,
    };

  default:
    return state;
  }
};
