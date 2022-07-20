import React from 'react';

// Antd
// eslint-disable-next-line
import { Mask } from 'antd-mobile';
import {
  ExclamationCircleOutline,
  CloseCircleOutline,
  DownFill,
  ClockCircleOutline,
} from 'antd-mobile-icons';

import PropTypes from 'prop-types';

// Styles
import styles from './JpSlotSelect.module.scss';

const JpSlotSelect = ({ visible, hidden }) => {
  console.log(visible, hidden);
  return (
    <>
      {/* <Mask visible={visible} onMaskClick={hidden} opacity={0.1} /> */}
      <section className={styles.container}>
        <div className={styles.header}>
          <div className={styles['header-title']}>
            <span>北斗之拳-拳王</span>
            <div className={styles['header-icon-box']}>
              <ExclamationCircleOutline />
              <CloseCircleOutline />
            </div>
          </div>

          <div className={styles['header-content']}>
            <div className={styles['header-content-image']} />
            <div className={styles['header-content-action']}>
              <button type="button" className={styles['booking-btn']}>
                預約
              </button>
              <button type="button" className={styles['start-btn']}>
                開始遊戲
              </button>
            </div>
          </div>
          <div className={styles['header-action']}>
            <DownFill />
            16
            <DownFill />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles['body-title']}>
            <span className={styles.text}>機台資訊</span>
            <span className={styles.time}>
              <ClockCircleOutline />
              <span>Today</span>
            </span>
          </div>
          <div className={styles['body-current-data']}>
            {new Array(3).fill(null).map(() => (
              <div className={styles.statistics}>chart</div>
            ))}
          </div>
          <div className={styles['body-chart']}>chart</div>
          <div className={styles['body-bb']}>bb</div>
          <div className={styles['body-rb']}>rb</div>
        </div>
      </section>
    </>
  );
};

JpSlotSelect.propTypes = {
  visible: PropTypes.bool.isRequired,
  hidden: PropTypes.func.isRequired,
};

export default JpSlotSelect;
