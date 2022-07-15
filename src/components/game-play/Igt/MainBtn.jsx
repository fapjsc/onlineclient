import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './MainBtn.module.scss';
import TheCountdown from '../../Countdown';

const MainBtn = ({
  mainBtnClick,
  setMainBtnClick,
  mainBtnHandler,
  setIsAuto,
  isAuto,
}) => {
  const [current, setCurrent] = useState('');

  // Main button 動畫邏輯判斷
  const animationHandler = (id) => {
    // 啟動main button 動畫邏輯
    // 如果點擊的按鈕已經是true就return
    if (mainBtnClick[id]) return;

    // 設定點擊的按鈕為true
    setMainBtnClick((prev) => ({
      ...prev,
      [id]: true,
    }));
    // 300ms後重新設定為false (動畫結束時間為150ms)
    setTimeout(() => {
      setMainBtnClick((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 300);
  };

  const onClickHandler = ({ target }, code) => {
    setCurrent(target.id);
    setTimeout(() => {
      setCurrent('');
    }, 200);
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
          [styles['main-btn-animation']]: current === 'auto',
        })}`}
      />

      {
        isAuto.action && (
          <div className={styles['countdown-box']}>
            <TheCountdown setIsAuto={setIsAuto} isAuto={isAuto} />
          </div>
        )
      }

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

MainBtn.propTypes = {
  mainBtnClick: PropTypes.shape({
    auto: PropTypes.bool,
    max: PropTypes.bool,
    spin: PropTypes.bool,
  }).isRequired,
  setMainBtnClick: PropTypes.func.isRequired,
  mainBtnHandler: PropTypes.func.isRequired,
  setIsAuto: PropTypes.func.isRequired,
  isAuto: PropTypes.shape({
    action: PropTypes.bool.isRequired,
    limit: PropTypes.number,
  }).isRequired,
};

export default MainBtn;
