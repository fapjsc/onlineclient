import React, { useState } from 'react';

// Components
import Carousel from '../components/Carousel';
import LoginForm from '../components/LoginForm';
import HomeAction from '../components/home-action/HomeAction';
import HomeButton from '../components/home-button/HomeButton';

// Styles
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <>
      <LoginForm visible={showLoginForm} setVisible={setShowLoginForm} />

      <div className={styles['content-box']}>
        <div className={styles.carousel}>
          <Carousel />
        </div>

        <HomeAction setShowLoginForm={setShowLoginForm} />

        <div className={styles['text-box']} />
      </div>

      <HomeButton />
    </>
  );
};

export default LandingPage;
