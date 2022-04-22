import io from 'socket.io-client';

import { store } from '../store';

import {
  setUserSocketStatus,
  // eslint-disable-next-line
  updateOnline,
} from '../store/actions/userActions';

import { agentServer } from '../apis';

let socket;

let allowCall = true;

export const connectSocket = (token) => {
  if (socket?.connected) return;
  if (!allowCall) return;

  console.log('call socket connect func');

  allowCall = false;

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
    store.dispatch(setUserSocketStatus('disconnect'));
  });

  socket.on('error', (error) => {
    console.log(error);
  });

  socket.on('update-point', (data) => {
    console.log(data);
    store.dispatch(updateOnline({ onlineData: data }));
  });

  allowCall = true;
};

export const disconnectSocket = () => {
  if (!socket) return;
  socket?.disconnect();
};

export const getSocket = () => socket;
