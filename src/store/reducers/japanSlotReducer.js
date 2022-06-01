import { japanSlotActionsTypes } from '../types';

const initialState = {
  point: [],
};

export const temp = () => {};

export const japanSlotReducer = (state = initialState, action) => {
  switch (action.type) {
  case japanSlotActionsTypes.SET_POINT:
    return {
      ...state,
      point: action.payload,
    };

  case japanSlotActionsTypes.CLEAN_STATUS:
    return initialState;

  default:
    return state;
  }
};
