import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // eslint-disable-next-line
  Navigate,
  useLocation,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ProtectRouter from './routes/ProtectRouter';
import LoadingPage from './pages/LoadingPage';

import './App.scss';

const GamePlayPage = React.lazy(() => import('./pages/game-play/GamePlayPage'));
const Layout = React.lazy(() => import('./pages/Layout/Layout'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));

// eslint-disable-next-line
const AnimatedSwitch = () => {
  const location = useLocation();

  console.log(location, 'key');

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

          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
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

    {/* <Suspense fallback={<LoadingPage />}>
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
    </Suspense> */}
  </Router>
);

export default App;
