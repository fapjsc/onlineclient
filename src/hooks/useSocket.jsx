// import { useCallback, useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { useDispatch } from 'react-redux';
// import { setUserSocketStatus } from '../store/actions/userActions';

// const useSocket = (serverPath, token) => {
//   const [socket, setSocket] = useState(null);
//   //   const [online, setOnline] = useState(false);

//   const dispatch = useDispatch();

//   const connectSocket = useCallback(() => {
//     console.log('call connect socket');
//     const socketTemp = io.connect(serverPath, {
//       transports: ['websocket'],
//       autoConnect: true,
//       forceNew: true,
//       query: {
//         'x-token': token,
//       },
//     });
//     setSocket(socketTemp);
//   }, [serverPath, token]);

//   const disconnectSocket = useCallback(() => {
//     socket?.disconnect();
//   }, [socket]);

//   useEffect(() => {
//     // if (socket?.connected === undefined) return;
//     dispatch(setUserSocketStatus(socket?.connected));
//   }, [socket, dispatch]);

//   useEffect(() => {
//     socket?.on('connect', () => {
//       dispatch(setUserSocketStatus(true));
//     });
//   }, [socket, dispatch]);

//   useEffect(() => {
//     socket?.on('disconnect', () => dispatch(setUserSocketStatus(false)));
//   }, [socket, dispatch]);

//   return {
//     socket,
//     connectSocket,
//     disconnectSocket,
//   };
// };

// export default useSocket;
