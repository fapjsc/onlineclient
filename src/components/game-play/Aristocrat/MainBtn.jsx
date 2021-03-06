import React from 'react';

import PropTypes from 'prop-types';

// eslint-disable-next-line
import { Dialog } from 'antd-mobile';

import { useSelector } from 'react-redux';

import classnames from 'classnames';

import TheCountdown from '../../Countdown';

import styles from './MainBtn.module.scss';

const MainBtn = ({
  mainBtnClick,
  setMainBtnClick,
  mainBtnHandler,
  setIsAuto,
  isAuto,
}) => {
  const { data } = useSelector((state) => state.selectEgm);

  const { buttonList } = data || {};

  const btnList = buttonList?.filter((btn) => btn.button_name === 'max');

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
    const { id } = target;
    animationHandler(id);
    mainBtnHandler({ name: id, code });
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
            ${classnames({
          'main-btn-animation': mainBtnClick.auto,
        })}
          `}
      />

      {
        isAuto.action && (
          <div className={styles['countdown-box']}>
            <TheCountdown setIsAuto={setIsAuto} isAuto={isAuto} />
          </div>
        )
      }

      {btnList
        && btnList.map((btn) => (
          <div
            key={btn.id}
            id={btn.button_name}
            code={btn.code}
            role="presentation"
            onClick={(e) => onClickHandler(e, btn.code)}
            className={`
            ${styles['main-btn']}
            ${styles[`btn-${btn.button_name}`]}
            ${classnames({
              'main-btn-animation': mainBtnClick[btn.button_name],
              'main-btn-animation-auto': btn.button_name === 'spin' && isAuto.action,
            })}
          `}
          />

        ))}

      <div
        id="spin"
        role="presentation"
        onClick={onClickHandler}
        className={`
            ${styles['main-btn']}
            ${styles['btn-spin']}
            ${classnames({
          'main-btn-animation': mainBtnClick.spin,
          'main-btn-animation-auto': isAuto.action,
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
