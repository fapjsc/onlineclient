import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProtectRouter from './routes/ProtectRouter';
import LoadingPage from './pages/LoadingPage';
import LandingPage from './pages/LandingPage';

import './App.scss';

const GamePlayPage = React.lazy(() => import('./pages/game-play/GamePlayPage'));
const Layout = React.lazy(() => import('./pages/Layout/Layout'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));

const AnimatedSwitch = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames="animation-item"
        timeout={300}
      >
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

          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/autoLogin" element={<LandingPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => (
  <Router>
    <Suspense fallback={<LoadingPage />}>
      <AnimatedSwitch />
    </Suspense>
  </Router>
);

export default App;
