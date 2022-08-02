import React from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './MainBtn.module.scss';

import TheCountdown from '../../Countdown';

const MainBtn = ({
  mainBtnHandler,
  mainBtnClick,
  setMainBtnClick,
  mainBtnList,
  setIsAuto,
  isAuto,
}) => {
  // Main button 動畫邏輯判斷
  const animationHandler = (id) => {
    if (mainBtnClick[id]) return;
    if (id === 'auto') {
      setIsAuto((prev) => !prev);
    }

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

  const onClickHandler = ({ target, code }) => {
    const { id } = target;
    animationHandler(id);
    mainBtnHandler({ name: id, code });
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

      {mainBtnList.map((btn) => (
        <div
          key={btn.id}
          role="presentation"
          id={btn.button_name}
          onClick={({ target }) => onClickHandler({ target, code: btn.code })}
          className={`${styles.btn} ${
            styles[`${btn.button_name}`]
          } ${classnames({
            [styles['main-btn-animation']]: mainBtnClick[`${btn.button_name}`],
            [styles['auto-spin-animation']]:
              btn.button_name === 'spin' && isAuto.action,
          })}`}
        />
      ))}
      {
        isAuto.action && (
          <div className={styles['countdown-box']}>
            <TheCountdown setIsAuto={setIsAuto} isAuto={isAuto} />
          </div>
        )
      }

      {/* <div
        role="presentation"
        id="max"
        code="1"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.max} ${classnames({
          [styles['main-btn-animation']]: mainBtnClick.max,
        })}`}
      />
      <div
        role="presentation"
        id="spin"
        code="0"
        onClick={onClickHandler}
        className={`${styles.btn} ${styles.spin} ${classnames({
          [styles['main-btn-animation']]: mainBtnClick.spin,
        })}`}
      /> */}
    </div>
  );
};
MainBtn.propTypes = {
  mainBtnHandler: PropTypes.func.isRequired,
  setMainBtnClick: PropTypes.func.isRequired,
  setIsAuto: PropTypes.func.isRequired,
  isAuto: PropTypes.bool.isRequired,
  mainBtnList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainBtnClick: PropTypes.shape({
    auto: PropTypes.bool,
    max: PropTypes.bool,
    spin: PropTypes.bool,
  }).isRequired,
};

export default MainBtn;
