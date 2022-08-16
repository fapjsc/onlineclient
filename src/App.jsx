import React, { Suspense, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import ProtectRouter from './routes/ProtectRouter';
import LoadingPage from './pages/LoadingPage';
import LandingPage from './pages/LandingPage';

import './App.scss';
import WarningWindow from './components/warningWindow/WarningWindow';
import { store } from './store';
import { showWarningWindow } from './store/actions/warningAction';

const GamePlayPage = React.lazy(() => import('./pages/game-play/GamePlayPage'));
const Layout = React.lazy(() => import('./pages/Layout/Layout'));
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const GameTypePage = React.lazy(() => import('./pages/game-type/GameTypePage'));

const AnimatedSwitch = () => {
  const location = useLocation();
  const {
    visible,
    propStatus,
    btnAction,
    windowText,
    btnText,
  } = useSelector((state) => state.warning);

  useEffect(() => {
    store.dispatch(showWarningWindow('off'));
  }, []);

  useEffect(() => {
    // console.log(visible, propStatus, btnAction, windowText, btnText);
  }, [visible, propStatus, btnAction, windowText, btnText]);
  return (
    <TransitionGroup component={null}>
      <WarningWindow
        visible={visible}
        propStatus={propStatus}
        btnAction={btnAction}
        windowText={windowText}
        btnText={btnText}
      />
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
            <Route path="/game-type" element={<GameTypePage />} />
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
