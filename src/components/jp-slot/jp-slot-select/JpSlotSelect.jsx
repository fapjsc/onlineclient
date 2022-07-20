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
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
// actions
import {
  selectEgm,
} from '../../../store/actions/egmActions';

// Styles
import styles from './JpSlotSelect.module.scss';

const JpSlotSelect = ({ visible, hidden, showJpSelectAction }) => {
  const dispatch = useDispatch();
  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };
  return (
    <>
      {/* <Mask visible={visible} onMaskClick={hidden} opacity={0.1} /> */}
      <section style={{ display: showJpSelectAction ? 'block' : 'none' }} className={styles.container}>
        <div className={styles.header}>
          <div className={styles['header-title']}>
            <span>北斗之拳-拳王</span>
            <div className={styles['header-icon-box']}>
              <ExclamationCircleOutline />
              <CloseCircleOutline onClick={hidden} />
            </div>
          </div>

          <div className={styles['header-content']}>
            <div className={styles['header-content-image']} />
            <div className={styles['header-content-action']}>
              <button type="button" className={styles['booking-btn']}>
                預約
              </button>
              <button type="button" onClick={() => selectEgmHandler(1)} className={styles['start-btn']}>
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
            {[['Games', 25], ['TotalGames', 9999], ['Average', 924]].map((item) => (
              <div className={styles.statistics}>
                <div>{item[0]}</div>
                <div>{item[1]}</div>
              </div>
            ))}
          </div>
          <div className={styles['body-chart']}></div>
          <div className={styles['body-bb']}>
            <div>BB</div>
            <div className={styles.spaceBetween}>
              {[['本日', 28], ['一日前', 9], ['兩日前', 6]].map((item) => (
                <div className={styles.statistics}>
                  <div>{item[0]}</div>
                  <div>{item[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles['body-rb']}>
            <div>RB</div>
            <div className={styles.spaceBetween}>
              {[['本日', 28], ['一日前', 9], ['兩日前', 6]].map((item) => (
                <div className={styles.statistics}>
                  <div>{item[0]}</div>
                  <div>{item[1]}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

JpSlotSelect.propTypes = {
  visible: PropTypes.bool.isRequired,
  hidden: PropTypes.func.isRequired,
  showJpSelectAction: PropTypes.bool.isRequired,
};

export default JpSlotSelect;
