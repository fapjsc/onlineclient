import React, { useState, useEffect } from 'react';

// Antd
// eslint-disable-next-line
import { Mask } from 'antd-mobile';
import {
  ExclamationCircleOutline,
  CloseCircleOutline,
  DownFill,
  ClockCircleOutline,
} from 'antd-mobile-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// Antd
import { Image, Dialog, Toast } from 'antd-mobile';

import loadingImg from '../../../assets/slot-list/loading.png';
import notFoundImg from '../../../assets/slot-list/找不到圖片.png';

import { getEgmImage } from '../../../utils/helper';

// actions
import {
  selectEgm,
} from '../../../store/actions/egmActions';

// Styles
import styles from './JpSlotSelect.module.scss';

import Bricks from '../../egmInfo/Bricks';
import EgmInfo from '../../egmInfo/egmInfo';
import image1 from '../../../assets/slot-list/sammy/拳王.webp';
import image2 from '../../../assets/slot-list/daito/吉宗.webp';

// Language
import language from './language';

const select = (slotType) => {
  if (slotType === 'slot') {
    return { img: image1, titleName: '北斗之拳', id: '1' };
  }
  if (slotType === 'slotGizon') {
    return { img: image2, titleName: '吉宗', id: '10' };
  }
};

// eslint-disable-next-line
const SlotSelect = ({ hidden }) => {
  const dispatch = useDispatch();
  const [showEgmInfo, setShowEgmInfo] = useState(false);
  const { action: showSelectAction, slotType } = useSelector((state) => state.pixi);

  useEffect(() => {
    console.log('pixiData => ', showSelectAction, slotType);
  }, [showSelectAction, slotType]);

  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };
  const egmInfoClose = () => {
    setShowEgmInfo(false);
  };
  const egmInfoOpen = () => {
    setShowEgmInfo(true);
  };

  return (
    <>
      {/* <Mask visible={visible} onMaskClick={hidden} opacity={0.1} /> */}
      <EgmInfo show={showEgmInfo} close={egmInfoClose} slotType={slotType} />
      <section style={{ display: showSelectAction ? 'block' : 'none' }} className={styles.container}>
        <div className={styles.header}>
          <div className={styles['header-title']}>
            <span>{language[slotType]}</span>
            <div className={styles['header-icon-box']}>
              <ExclamationCircleOutline onClick={egmInfoOpen} />
              <CloseCircleOutline onClick={hidden} />
            </div>
          </div>

          <div className={styles['header-content']}>
            <Image
              className={styles['header-content-image']}
              src={getEgmImage({
                model: slotType,
                brandName: slotType,
              })}
              alt="Egm"
              style={{ height: '100%' }}
              lazy
              fallback={
                <Image
                  style={{ height: '100%', width: '100%' }}
                  src={notFoundImg}
                  lazy
                />
              }
              placeholder={
                <Image
                  lazy
                  style={{ height: '100%', width: '100%' }}
                  src={loadingImg}
                />
              }
            />
            {/* eslint-disable-next-line max-len */}
            {/* <img src={select(slotType).img} alt="info" className={styles['header-content-image']} /> */}
            <div className={styles['header-content-action']}>
              <button type="button" className={styles['booking-btn']}>
                {language.reservationGame}
              </button>
              <button type="button" onClick={() => selectEgmHandler(select(slotType).id)} className={styles['start-btn']}>
                {language.startGame}
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
            <span className={styles.text}>{language.slotInfo}</span>
            <span className={styles.time}>
              <ClockCircleOutline />
              <span>{language.today}</span>
            </span>
          </div>
          <div className={styles['body-current-data']}>
            {[['Games', 25], ['TotalGames', 9999], ['Average', '1/166']].map((item) => (
              <div className={styles.statistics}>
                <div>{item[0]}</div>
                <div>{item[1]}</div>
              </div>
            ))}
          </div>
          <div className={styles['body-chart']}>
            <DownFill />
            <Bricks />
            <DownFill />
          </div>
          <div className={styles['body-bb']}>
            <div>{language.bb}</div>
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
            <div>{language.rb}</div>
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

SlotSelect.propTypes = {
  hidden: PropTypes.func.isRequired,
};
SlotSelect.defaultProps = {
};

export default SlotSelect;
