import React from 'react';

import PropTypes from 'prop-types';

// Styles
import styles from './GameType.module.scss';

const GameType = ({ setCurrentAction }) => {
  const clickHandler = () => {
    setCurrentAction('slot-list');
  };

  return (
    <div className={styles['content-box']}>
      <div
        role="presentation"
        onClick={clickHandler}
        className={` ${styles['btn-type']} ${styles.slot}`}
      />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
      <div className={` ${styles['btn-type']} ${styles.other}`} />
    </div>
  );
};

GameType.propTypes = {
  setCurrentAction: PropTypes.func.isRequired,
};

export default GameType;
