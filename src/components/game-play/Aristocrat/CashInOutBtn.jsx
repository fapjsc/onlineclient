import React, { useEffect, useState } from 'react';

// Antd
// eslint-disable-next-line
import { Dialog, Button, Mask } from 'antd-mobile';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import useWindowSize from '../../../hooks/useWindowSize';

import styles from './CashInOutBtn.module.scss';

const CashInOutBtn = ({ isCashInOutClick, setIsCashInOutClick }) => {
  // eslint-disable-next-line
  const [toggle, setToggle] = useState(false);

  // eslint-disable-next-line
  const [height, width] = useWindowSize();

  useEffect(() => {
    console.log(toggle);
  }, [toggle]);

  const clickHandler = () => {
    setIsCashInOutClick(true);
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

      <Mask
        visible={isCashInOutClick}
        onMaskClick={() => setIsCashInOutClick(false)}
      >
        <section className={styles.form}>
          <header
            className={styles.header}
            style={{ height: !toggle && '100%' }}
          >
            Header
            <Button onClick={() => setToggle((prev) => !prev)}>test</Button>
          </header>
          <div className={styles.content}>Body</div>
          <footer className={styles.footer}>Footer</footer>
        </section>
      </Mask>
    </section>
  );
};

CashInOutBtn.propTypes = {
  isCashInOutClick: PropTypes.bool.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
};

export default CashInOutBtn;
