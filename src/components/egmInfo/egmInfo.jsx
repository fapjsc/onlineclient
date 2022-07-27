import React from 'react';
import PropTypes from 'prop-types';
import {
  CloseCircleOutline,
} from 'antd-mobile-icons';
import styles from './egmInfo.module.scss';
// eslint-disable-next-line no-unused-vars
import { egmInfoText } from './emgInfoText';
import image1 from './北斗之拳遊戲說明_日文版.jpeg';
import image2 from './吉宗遊戲說明_日文版.jpeg';

const select = (slotType) => {
  if (slotType === 'slot') {
    return { img: image1, titleName: '北斗之拳' };
  }
  if (slotType === 'slotGizon') {
    return { img: image2, titleName: '吉宗' };
  }
};

const EgmInfo = ({ show, close, slotType }) => (
  <div style={{ display: show ? 'flex' : 'none' }} className={styles.container}>
    <div className={styles.header}>
      <div>{select(slotType).titleName}</div>
      <CloseCircleOutline onClick={close} />
    </div>
    <div className={styles.body}>
      <img src={select(slotType).img} alt="info" className={styles['body-firstBox']} />

      <div className={styles['body-secondBox']}>
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
        <a href="#">實際機台遊玩影片</a>
      </div>
      {/* <div className={styles['body-thirdBox']}>
        {
          egmInfoText[slotType]
        }
      </div> */}
    </div>
  </div>
);
EgmInfo.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  slotType: PropTypes.string,
};
EgmInfo.defaultProps = {
  slotType: 'slot',
};
export default EgmInfo;
