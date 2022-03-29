import React, { useState } from 'react';

import classnames from 'classnames';

import styles from './MainBtn.module.scss';

const MainBtn = () => {
  const [current, setCurrent] = useState('');

  const onClickHandler = ({ target }) => {
    setCurrent(target.id);

    setTimeout(() => {
      setCurrent('');
    }, 200);
  };

  return (
    <div className={styles.container}>
      <div
        role="presentation"
        id="auto"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.auto} ${classnames({
          [styles['main-btn-animation']]: current === 'auto',
        })}`}
      />
      <div
        role="presentation"
        id="max"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.max} ${classnames({
          [styles['main-btn-animation']]: current === 'max',
        })}`}
      />
      <div
        role="presentation"
        id="spin"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.spin} ${classnames({
          [styles['main-btn-animation']]: current === 'spin',
        })}`}
      />
    </div>
  );
};

export default MainBtn;
