import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line
const ProtectRoute = ({ children }) => {
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectRoute;
