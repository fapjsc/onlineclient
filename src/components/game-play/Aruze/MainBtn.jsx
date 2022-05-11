import React from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './MainBtn.module.scss';

const MainBtn = ({ mainBtnHandler, mainBtnClick, setMainBtnClick }) => {
  // Main button 動畫邏輯判斷
  const animationHandler = (id) => {
    // 設定點擊的按鈕為true
    setMainBtnClick((prev) => ({
      ...prev,
      [id]: true,
    }));

    // 200ms後重新設定為false (動畫結束時間為150ms)
    setTimeout(() => {
      setMainBtnClick((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 200);
  };

  const onClickHandler = ({ target }) => {
    const { id } = target;
    animationHandler(id);
    mainBtnHandler({ name: id, code: id });
  };

  return (
    <div className={styles.container}>
      <div
        role="presentation"
        id="auto"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.auto} ${classnames({
          [styles['main-btn-animation']]: mainBtnClick.auto,
        })}`}
      />
      <div
        role="presentation"
        id="max"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.max} ${classnames({
          [styles['main-btn-animation']]: mainBtnClick.max,
        })}`}
      />
      <div
        role="presentation"
        id="spin"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.spin} ${classnames({
          [styles['main-btn-animation']]: mainBtnClick.spin,
        })}`}
      />
    </div>
  );
};
MainBtn.propTypes = {
  mainBtnHandler: PropTypes.func.isRequired,
  setMainBtnClick: PropTypes.func.isRequired,
  mainBtnClick: PropTypes.shape({
    auto: PropTypes.bool,
    max: PropTypes.bool,
    spin: PropTypes.bool,
  }).isRequired,
};

export default MainBtn;
