import io from 'socket.io-client';

import { store } from '../store';

// Actions
import {
  setUserSocketStatus,
  updateOnline,
} from '../store/actions/userActions';
import { setMessages } from '../store/actions/chatActions';
import { upDateEgmData } from '../store/actions/egmActions';
import { setJapanSlotPoint } from '../store/actions/japanSlotActins';

// APIs
import { agentServer } from '../apis';

// Helpers
import { scrollToBottomAnimated } from './scrollToBottom';
import { egmActionTypes } from '../store/types';

let socket;

export const connectSocket = (token) => {
  if (socket?.connected) return;

  socket = io.connect(agentServer.socketUrl, {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    query: {
      'x-token': token,
    },
  });

  socket.on('connect', () => {
    console.log('connect');
    store.dispatch(setUserSocketStatus('connect'));
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    store.dispatch(setUserSocketStatus('disconnect'));
  });

  socket.on('error', (error) => {
    console.log(error);
  });
  socket.on('playerPressTime', () => {
    console.log('playerPressTime');
    store.dispatch({
      type: egmActionTypes.PLAYER_PRESS_TIME_ON,
      payLoad: '',
    });
  });

  socket.on('onlineEgmList', (egmStatus) => {
    const { data } = store.getState().egmList;
    const existsIP = data?.map((el) => el.ip);
    const filterArr = Object.values(egmStatus).filter((egm) => existsIP?.includes(egm.ip));
    if (!filterArr?.length) return;
    store.dispatch(upDateEgmData(filterArr));
  });

  socket.on('update-point', (data) => {
    store.dispatch(updateOnline({ onlineData: data }));
  });

  socket.on('chatRoomDemo', (message) => {
    // console.log(message, 'from server');
    store.dispatch(setMessages(message));
    scrollToBottomAnimated('message-container');
  });

  socket.on('demoSlot', (data) => {
    store.dispatch(setJapanSlotPoint(data));
  });

  socket.on('stayingPage', (data) => {
    console.log(data);
  });
};

export const disconnectSocket = () => {
  if (!socket) return;
  socket?.disconnect();
};

export const getSocket = () => socket;

export const sendMessage = (message) => {
  if (!socket) return;

  socket.emit('chatRoomDemo', message);
};
