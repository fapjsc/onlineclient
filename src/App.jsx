import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProtectRouter from './routes/ProtectRouter';

import Layout from './pages/Layout/Layout';
import HomePage from './pages/home/HomePage';
import GamePlayPage from './pages/game-play/GamePlayPage';

import './App.scss';

const App = () => (
  <Router>
    <Routes>
      <Route
        path="/game-play"
        element={
          <ProtectRouter>
            <Layout />
          </ProtectRouter>
        }
      >
        <Route path="/game-play" element={<GamePlayPage />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default App;
