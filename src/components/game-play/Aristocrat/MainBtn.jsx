import React from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './MainBtn.module.scss';

const MainBtn = ({ onClickHandler, mainBtnClick, isAuto }) => (
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

MainBtn.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  isAuto: PropTypes.bool,
  mainBtnClick: PropTypes.shape({
    auto: PropTypes.bool,
    max: PropTypes.bool,
    spin: PropTypes.bool,
  }).isRequired,
};

MainBtn.defaultProps = {
  isAuto: false,
};

export default MainBtn;
