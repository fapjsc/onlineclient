import { pixiActionTypes } from '../types';

const pixiState = {
  action: false,
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

const peoleState = {
  people: [],
};

export const peopleReducer = (state = peoleState, action) => {
  switch (action.type) {
  case pixiActionTypes.SET_PEOPLE:
    return { people: action.payload.sort((item1, item2) => item1.id - item2.id) };
  case pixiActionTypes.CHANGE_PEOPLE:
    return { people: action.payload.sort((item1, item2) => item1.id - item2.id) };
  default:
    return state;
  }
};

const slotState = {
  slot: [],
};

export const slotReducer = (state = slotState, action) => {
  switch (action.type) {
  case pixiActionTypes.SET_SLOT:
    return { slot: action.payload.sort((item1, item2) => item1.id - item2.id) };

  default:
    return state;
  }
};
