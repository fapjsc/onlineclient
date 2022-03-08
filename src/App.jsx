import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import ProtectRouter from './routes/ProtectRouter';
import LoadingPage from './pages/LoadingPage';

import './App.scss';

const GamePlayPage = React.lazy(() => import('./pages/game-play/GamePlayPage'));
const Layout = React.lazy(() => import('./pages/Layout/Layout'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));

const App = () => (
  <Suspense fallback={<LoadingPage />}>
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

        {/* <Route path="*" element={<LoadingPage />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </Suspense>
);

export default App;
