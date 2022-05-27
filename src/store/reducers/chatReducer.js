import { chatActionTypes } from '../types';

const initState = {
  messages: [],
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
  case chatActionTypes.SET_MESSAGE_LIST:
    return {
      messages: [...state.messages, action.payload],
    };

  default:
    return state;
  }
};

export default chatReducer;
