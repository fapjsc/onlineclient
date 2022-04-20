// eslint-disable-next-line
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// CSS Transition
import { CSSTransition } from 'react-transition-group';

// eslint-disable-next-line
import throttle from 'lodash.throttle';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import Carousel from '../../components/Carousel';
import HomeAction from '../../components/home-action/HomeAction';
import HomeButton from '../../components/home-button/HomeButton';
import HomeHeader from '../../components/home-header/HomeHeader';
import GameType from '../../components/game-type/GameType';
import SlotList from '../../components/slot-list/SlotList';
import LoginForm from '../../components/LoginForm';
import User from '../../components/user/User';

// Actions
import { clearSelectEgmData } from '../../store/actions/egmActions';
import {
  setCurrentAction,
  // eslint-disable-next-line
  updateOnline,
} from '../../store/actions/userActions';

// Hooks
import useAuth from '../../hooks/useAuth';

// Socket
// eslint-disable-next-line
import { connectSocket, disconnectSocket } from '../../utils/socket';

// Styles
import styles from './HomePage.module.scss';

const HomePage = () => {
  // InitState
  const { isAuth, isSelectEgm } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Redux
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { currentAction, data, socketOnline } = useSelector(
    (state) => state.user,
  );
  const { token } = data || {};

  const setCurrentActionHandler = (action) => {
    dispatch(setCurrentAction(action));
  };

  const connectSocketHandler = useCallback((userToken) => {
    connectSocket(userToken);
  }, []);

  const throttledConnectSocket = useMemo(
    () => throttle(connectSocketHandler, 10000),
    [connectSocketHandler],
  );

  // const throttledConnectSocket = useCallback(
  //   () => throttle(connectSocket(token), 1000),
  //   [token],
  // );

  // 關閉login form
  useEffect(() => {
    if (isAuth && showLoginForm) setShowLoginForm(false);
  }, [isAuth, showLoginForm]);

  // 清除select egm status
  useEffect(() => {
    if (!isSelectEgm) return;
    dispatch(clearSelectEgmData());
  }, [isSelectEgm, dispatch]);

  const userOnEnter = () => {
    console.log('user entered');
  };

  useEffect(() => {
    if (!token) return;
    connectSocket(token);
    // throttledConnectSocket(token);
  }, [token, throttledConnectSocket]);

  return (
    <>
      <LoginForm visible={showLoginForm} setVisible={setShowLoginForm} />
      <div className={styles.container}>
        <CSSTransition
          in={currentAction === 'home'}
          classNames="animation-item"
          timeout={100}
          mountOnEnter
          unmountOnExit
        >
          <section className={styles['content-landing-box']}>
            <Carousel />
            <HomeAction setShowLoginForm={setShowLoginForm} isAuth={isAuth} />
          </section>
        </CSSTransition>

        <CSSTransition
          in={currentAction !== 'home'}
          classNames="animation-item"
          timeout={100}
          mountOnEnter
          unmountOnExit
        >
          <section className={styles['content-box']}>
            <HomeHeader
              setCurrentAction={setCurrentActionHandler}
              currentAction={currentAction}
            />

            <CSSTransition
              in={currentAction === 'game-type'}
              classNames="animation-item"
              timeout={100}
              mountOnEnter
              unmountOnExit
            >
              <GameType setCurrentAction={setCurrentActionHandler} />
            </CSSTransition>

            <CSSTransition
              in={currentAction === 'slot-list'}
              classNames="animation-item"
              timeout={100}
              mountOnEnter
              unmountOnExit
            >
              <SlotList />
            </CSSTransition>

            <CSSTransition
              in={currentAction === 'user'}
              classNames="animation-item"
              timeout={100}
              mountOnEnter
              unmountOnExit
              onEntered={userOnEnter}
            >
              <User />
            </CSSTransition>
          </section>
        </CSSTransition>
      </div>

      <HomeButton setCurrentAction={setCurrentActionHandler} />
    </>
  );
};

export default HomePage;
