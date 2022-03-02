import React from 'react';

import PropTypes from 'prop-types';

// Antd
import { NavBar } from 'antd-mobile';

// Image
import btnBack from '../../assets/button/btn-back.png';

import styles from './HomeHeader.module.scss';

const HomeHeader = ({ setCurrentAction, currentAction }) => {
  console.log(currentAction);

  const showText = {
    'game-type': {
      title: '遊戲種類',
      sub: 'GAME TYPE',
    },
    'slot-list': {
      title: '老虎機',
      sub: 'SLOT GAME',
    },
  };

  const backBtnHandler = () => {
    if (currentAction === 'slot-list') {
      setCurrentAction('game-type');
      return;
    }
    setCurrentAction('home');
  };

  return (
    <header className={styles.header}>
      <NavBar
        backArrow={
          <img
            style={{ width: '3rem', height: '3rem' }}
            src={btnBack}
            alt="back"
            onClick={backBtnHandler}
            role="presentation"
          />
        }
      >
        <div className={styles['header-text-box']}>
          <span className={styles['header-title']}>
            {showText[currentAction]?.title}
          </span>
          <span className={styles['header-text']}>
            {showText[currentAction]?.sub}
          </span>
        </div>
      </NavBar>
    </header>
  );
};

HomeHeader.propTypes = {
  setCurrentAction: PropTypes.func.isRequired,
  currentAction: PropTypes.string.isRequired,
};

export default HomeHeader;
