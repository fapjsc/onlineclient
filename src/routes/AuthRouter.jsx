import React from 'react';
// eslint-disable-next-line
import { Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
// import RegisterPage from '../pages/RegisterPage';

const AuthRouter = () => {
  console.log('auth router');
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="*" element={<Navigate to="/auth/landing" />} />
    </Routes>
  );
};

export default AuthRouter;
