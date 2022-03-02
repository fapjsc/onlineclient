import React, { useState, useEffect } from 'react';

import Carousel from '../../components/Carousel';
import HomeAction from '../../components/home-action/HomeAction';
import HomeButton from '../../components/home-button/HomeButton';
import HomeHeader from '../../components/home-header/HomeHeader';
import GameType from '../../components/game-type/GameType';
import SlotList from '../../components/slot-list/SlotList';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const [currentAction, setCurrentAction] = useState('home');

  console.log('home page');

  useEffect(() => {
    console.log(currentAction);
  }, [currentAction]);
  return (
    <>
      <div className={styles['content-box']}>
        {currentAction === 'home' && (
          <div className={styles.carousel}>
            <Carousel />
          </div>
        )}

        <section className={styles.container}>
          {currentAction === 'home' && <HomeAction />}

          {currentAction !== 'home' && (
            <HomeHeader
              setCurrentAction={setCurrentAction}
              currentAction={currentAction}
            />
          )}

          {currentAction === 'game-type' && (
            <GameType setCurrentAction={setCurrentAction} />
          )}

          {currentAction === 'slot-list' && <SlotList />}
        </section>

        <div className={styles['text-box']} />
      </div>

      <HomeButton setCurrentAction={setCurrentAction} />
    </>
  );
};

export default HomePage;
