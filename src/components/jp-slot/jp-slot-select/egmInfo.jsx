import React from 'react';
import PropTypes from 'prop-types';
import {
  ExclamationCircleOutline,
  CloseCircleOutline,
  DownFill,
  ClockCircleOutline,
} from 'antd-mobile-icons';
import styles from './egmInfo.module.scss';

const egmInfoText = {
  '1': <>
    10回合的AT，只有8次的15枚小獎。<br />
    但例外的是「純摃龜」或者是「特殊綠瓜」有時也會引發JACIN。<br/>
    TYPE-C機種並沒有BIG（大獎彩金），只有REG（通常採金 / JAC 遊戲一回合）。<br/>
    JAC遊戲: 一般來說有特定獎項 8回。最大12回。<br/>
    <br/>
    「北斗之拳」是靠著戰鬥彩金 BB 的連莊來累積增加代幣<br/>

    </>
}

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
          egmInfoText['1']
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
