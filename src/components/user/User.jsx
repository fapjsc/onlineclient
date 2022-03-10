import React from 'react';
// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Button } from 'antd-mobile';

// Actions
import { logout } from '../../store/actions/userActions';

const User = () => {
  const dispatch = useDispatch();
  console.log('user');
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={() => dispatch(logout())}>登出</Button>
    </div>
  );
};

export default User;
