import React from 'react';

import PropTypes from 'prop-types';

import styles from './HomeButton.module.scss';

const HomeButton = ({ setCurrentAction }) => (
  <div className={styles['home-btn-container']}>
    <div className={styles['home-btn-box']}>
      <div className={styles['btn-container']}>
        <div
          role="presentation"
          onClick={() => setCurrentAction('home')}
          className={`${styles.home} ${styles['home-btn']}`}
        />
        <div
          role="presentation"
          onClick={() => setCurrentAction('game-type')}
          className={`${styles.game} ${styles['home-btn']}`}
        />
        <div
          role="presentation"
          onClick={() => setCurrentAction('user')}
          className={`${styles.user} ${styles['home-btn']}`}
        />
      </div>
      <div className={styles['icon-container']} />
    </div>
  </div>
);

HomeButton.propTypes = {
  setCurrentAction: PropTypes.func,
};

HomeButton.defaultProps = {
  setCurrentAction: null,
};

export default HomeButton;
