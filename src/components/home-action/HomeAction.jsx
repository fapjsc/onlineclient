import React from 'react';
import PropTypes from 'prop-types';

import styles from './HomeAction.module.scss';

const HomeAction = ({ setShowLoginForm }) => (
  <div className={styles['action-box']}>
    <div className={`${styles.notify} ${styles['action-small-btn']}`}>
      最新公告
    </div>
    <div className={`${styles.promo} ${styles['action-small-btn']}`}>
      優惠活動
    </div>

    {setShowLoginForm && (
      <>
        <div
          role="presentation"
          onClick={() => {
            setShowLoginForm(true);
          }}
          className={`${styles.login} ${styles['action-big-btn']}`}
        >
          登入
        </div>
        {/* <div className={`${styles.register} ${styles['action-big-btn']}`}>
          註冊
        </div> */}
      </>
    )}
  </div>
);

HomeAction.propTypes = {
  setShowLoginForm: PropTypes.func,
};

HomeAction.defaultProps = {
  setShowLoginForm: null,
};

export default HomeAction;
