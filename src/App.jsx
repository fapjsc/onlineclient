import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProtectRouter from './routes/ProtectRouter';

// import HomePage from './pages/home/HomePage';
import LoadingPage from './pages/LoadingPage';
// import Layout from './pages/Layout/Layout';
// import GamePlayPage from './pages/game-play/GamePlayPage';

import './App.scss';

const GamePlayPage = React.lazy(() => import('./pages/game-play/GamePlayPage'));
const Layout = React.lazy(() => import('./pages/Layout/Layout'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingPage />}>
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

        {/* <Route path="*" element={<LoadingPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
