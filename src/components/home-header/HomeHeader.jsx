import React from 'react';

import PropTypes from 'prop-types';

// Antd
// eslint-disable-next-line
import { NavBar } from 'antd-mobile';

// Image
// eslint-disable-next-line
import btnBack from '../../assets/button/btn-back.png';

import styles from './HomeHeader.module.scss';

const HomeHeader = ({ setCurrentAction, currentAction }) => {
  // eslint-disable-next-line
  const showText = {
    'game-type': {
      title: '遊戲種類',
      sub: 'GAME TYPE',
    },
    'slot-list': {
      title: '老虎機',
      sub: 'SLOT GAME',
    },
    user: {
      title: '會員中心',
      sub: 'Member Centre',
    },
  };

  // eslint-disable-next-line
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
        style={{ width: '100%' }}
        backArrow={
          <img
            // style={{ width: '3rem', height: '3rem' }}
            src={btnBack}
            alt="back"
            onClick={backBtnHandler}
            role="presentation"
            className={styles.img}
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
