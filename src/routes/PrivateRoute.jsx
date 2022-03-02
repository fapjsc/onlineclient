import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line
const PrivateRouter = ({ isAuthenticated, element: Component, ...rest }) => {
  console.log('private');
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/auth" />;
};

export default PrivateRouter;
