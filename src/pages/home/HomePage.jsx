import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { authFetch } from '../../config/axiosConfig';

// Redux

// Components
import Carousel from '../../components/Carousel';
import HomeAction from '../../components/home-action/HomeAction';
import HomeButton from '../../components/home-button/HomeButton';
import HomeHeader from '../../components/home-header/HomeHeader';
import GameType from '../../components/game-type/GameType';

// eslint-disable-next-line
import SlotList from '../../components/slot-list/SlotList';
import LoginForm from '../../components/LoginForm';

// Actions
import { clearSelectEgmData } from '../../store/actions/egmActions';

// Hooks
import useAuth from '../../hooks/useAuth';

// Styles
import styles from './HomePage.module.scss';

console.log(authFetch);

const HomePage = () => {
  const { isAuth, isSelectEgm } = useAuth();

  const dispatch = useDispatch();

  const [currentAction, setCurrentAction] = useState('home');
  const [showLoginForm, setShowLoginForm] = useState(false);

  // 關閉login form
  useEffect(() => {
    if (isAuth && showLoginForm) setShowLoginForm(false);
  }, [isAuth, showLoginForm]);

  // 清除select egm status
  useEffect(() => {
    if (!isSelectEgm) return;
    dispatch(clearSelectEgmData());
  }, [isSelectEgm, dispatch]);

  return (
    <>
      <LoginForm visible={showLoginForm} setVisible={setShowLoginForm} />

      <div className={styles.container}>
        {currentAction === 'home' && (
          <section className={styles['content-landing-box']}>
            <div className={styles.carousel}>
              <Carousel />
            </div>
            <HomeAction setShowLoginForm={setShowLoginForm} isAuth={isAuth} />
          </section>
        )}

        {currentAction !== 'home' && (
          <section className={styles['content-box']}>
            <HomeHeader
              setCurrentAction={setCurrentAction}
              currentAction={currentAction}
            />

            {currentAction === 'game-type' && (
              <GameType setCurrentAction={setCurrentAction} />
            )}

            {currentAction === 'slot-list' && <SlotList />}
          </section>
        )}
      </div>

      <HomeButton setCurrentAction={setCurrentAction} />
    </>
  );
};

export default HomePage;
