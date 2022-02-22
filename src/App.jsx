import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Auth from './pages/Auth';
import UnAuth from './pages/Login';

import ProtectRoute from './routes/ProtectRoute';

const App = () => (
  <Router>
    <Routes>
      <Route
        path="auth"
        element={
          <ProtectRoute>
            <Auth />
          </ProtectRoute>
          }
      />
      <Route path="login" element={<UnAuth />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
