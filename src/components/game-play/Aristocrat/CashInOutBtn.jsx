import React from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './CashInOutBtn.module.scss';

const CashInOutBtn = ({ isCashInOutClick, setIsCashInOutClick, setIsAuto }) => {
  const clickHandler = () => {
    setIsCashInOutClick(true);
    setIsAuto({ action: false, limit: null });
  };

  return (
    <section className={styles['cash-in-out-btn-box']}>
      <div
        role="presentation"
        onClick={clickHandler}
        className={`${styles['cash-in-out-btn']} ${classnames({
          [styles['cash-in-out-bg']]: !isCashInOutClick,
          [styles['cash-in-out-action']]: isCashInOutClick,
        })}
        `}
      />
    </section>
  );
};

CashInOutBtn.propTypes = {
  isCashInOutClick: PropTypes.bool.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  setIsAuto: PropTypes.func.isRequired,
};

export default CashInOutBtn;
