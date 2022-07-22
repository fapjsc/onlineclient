import React from 'react';
import PropTypes from 'prop-types';
import {
  ExclamationCircleOutline,
  CloseCircleOutline,
  DownFill,
  ClockCircleOutline,
} from 'antd-mobile-icons';
import styles from './egmInfo.module.scss';
import { egmInfoText } from './emgInfoText';

const EgmInfo = ({ show, close }) => (
  <div style={{ display: show ? 'flex' : 'none' }} className={styles.container}>
    <div className={styles.header}>
      <div>北斗之拳</div>
      <CloseCircleOutline onClick={close} />
    </div>
    <div className={styles.body}>
      <div className={styles['body-firstBox']}>
        <div className={styles['body-firstBox-left']}>
            <div></div>
            <div></div>
        </div>
        <div className={styles['body-firstBox-right']}>
        </div>
      </div>

      <div className={styles['body-secondBox']}>
        <a href='#'>實際機台遊玩影片</a>
      </div>
      <div className={styles['body-thirdBox']}>
        {
          egmInfoText['北斗之拳']
        }
      </div>
    </div>
  </div>
);
EgmInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
export default EgmInfo;
