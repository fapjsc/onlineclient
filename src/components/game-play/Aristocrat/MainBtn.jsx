import React, { useState } from 'react';

import classnames from 'classnames';

import styles from './MainBtn.module.scss';

const MainBtn = () => {
  const [isAuto, setIsAuto] = useState(false);

  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  // Main button 動畫邏輯判斷
  const onClickHandler = ({ target }) => {
    const { id } = target;

    if (id === 'auto') {
      setIsAuto((prev) => !prev);
    }

    // 啟動main button 動畫邏輯
    // 如果點擊的按鈕已經是true就return
    if (mainBtnClick[id]) return;

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

  return (
    <div className={styles['main-btn-holder']}>
      <div
        id="auto"
        role="presentation"
        onClick={onClickHandler}
        className={`
            ${styles['main-btn']} 
            ${styles['btn-auto']} 
            ${classnames({ 'main-btn-animation': mainBtnClick.auto })}
          `}
      />
      <div
        id="max"
        role="presentation"
        onClick={onClickHandler}
        className={`
            ${styles['main-btn']} 
            ${styles['btn-max']} 
            ${classnames({ 'main-btn-animation': mainBtnClick.max })}
          `}
      />
      <div
        id="spin"
        role="presentation"
        onClick={onClickHandler}
        className={`
            ${styles['main-btn']} 
            ${styles['btn-spin']} 
            ${classnames({
          'main-btn-animation': mainBtnClick.spin,
          'main-btn-animation-auto': isAuto,
        })}
          `}
      />
    </div>
  );
};

export default MainBtn;
