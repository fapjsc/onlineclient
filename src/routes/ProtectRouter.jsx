import React from 'react';

import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// eslint-disable-next-line
const ProtectRoute = ({ children }) => {
  const { isAuth, isSelectEgm } = useAuth();

  if (!isAuth || !isSelectEgm) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectRoute;
