import React from 'react';
import PropTypes from 'prop-types';

import styles from './HomeAction.module.scss';

const HomeAction = ({ setShowLoginForm, isAuth }) => (
  <div className={styles['action-box']}>
    <div className={`${styles.notify} ${styles['action-small-btn']}`}>
      最新公告
    </div>
    <div className={`${styles.promo} ${styles['action-small-btn']}`}>
      優惠活動
    </div>

    {!isAuth && (
      <div
        role="presentation"
        onClick={() => {
          setShowLoginForm(true);
        }}
        className={`${styles.login} ${styles['action-big-btn']}`}
      >
        登入
      </div>
    )}
  </div>
);

HomeAction.propTypes = {
  setShowLoginForm: PropTypes.func,
  isAuth: PropTypes.bool,
};

HomeAction.defaultProps = {
  setShowLoginForm: null,
  isAuth: false,
};

export default HomeAction;
