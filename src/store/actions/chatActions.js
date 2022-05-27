import { chatActionTypes } from '../types';

export const setMessages = (message) => ({
  type: chatActionTypes.SET_MESSAGE_LIST,
  payload: message,
});

export const temp = () => {};
