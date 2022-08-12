/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// Antd
import {
  Mask,
  Image,
  Toast,
} from 'antd-mobile';
import {
  ExclamationCircleOutline,
  CloseCircleOutline,
  DownFill,
  ClockCircleOutline,
} from 'antd-mobile-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { agentServer } from '../../../apis';

import loadingImg from '../../../assets/slot-list/loading.png';
import notFoundImg from '../../../assets/slot-list/找不到圖片.png';

import { getEgmImage } from '../../../utils/helper';

// actions
import {
  selectEgm,
} from '../../../store/actions/egmActions';

// Styles
import styles from './JpSlotSelect.module.scss';

// eslint-disable-next-line import/no-named-as-default
import Bricks from '../../egmInfo/Bricks';
import EgmInfo from '../../egmInfo/egmInfo';
// import image1 from '../../../assets/slot-list/sammy/拳王.webp';
// import image2 from '../../../assets/slot-list/daito/吉宗.webp';

import Bounce from '../../../HOC/Bounce';

// Language
import language from './language';

const BouncingDown = Bounce(DownFill);

// eslint-disable-next-line
const SlotSelect = ({ hidden }) => {
  const dispatch = useDispatch();
  const [showEgmInfo, setShowEgmInfo] = useState(false);
  const [fetchBonus, setFetchBonus] = useState({
    status: false,
    page: 1,
    take: 10,
  });
  const { action: showSelectAction, slot } = useSelector((state) => state.pixi);
  const brickRef = useRef(null);

  useEffect(() => {
    console.log('pixiData => ', showSelectAction, slot);
  }, [showSelectAction, slot]);

  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };
  const egmInfoClose = () => {
    setShowEgmInfo(false);
  };
  const egmInfoOpen = () => {
    setShowEgmInfo(true);
  };

  const rwd = (one, two) => ({
    height: (slot?.brandName === 'sammy' || slot?.brandName === 'daito') ? one : two,
  });

  useEffect(() => {
    if (fetchBonus.status) {
      console.log(fetchBonus);
      const url = `${agentServer.api}/jp_slot/${slot?.egmId}/infomation/play?page=${fetchBonus.page}&take=${fetchBonus.take}`;
      axios({
        method: 'get',
        url: url,
      }).then((response) => {
        brickRef.current = response?.data?.result;
        console.log('response => ', response?.data?.result);
        setFetchBonus((prev) => ({ ...prev, status: false }));
      }).catch((error) => {
        console.log(error);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchBonus]);

  useEffect(() => {
    if (showSelectAction) {
      setFetchBonus((prev) => ({ ...prev, status: true }));
    }
  }, [showSelectAction]);

  const { data: egm } = useSelector((state) => state.egmList);
  const jpSlot = egm?.find((item) => item?.id === slot?.egmId)?.jpSlot;
  //console.log(`this.egmID  ${slot?.egmId}\n all egm  ${egm}\n this.jpSlot   ${jpSlot}`);
  return (
    <>
      {/* <Mask visible={visible} onMaskClick={hidden} opacity={0.1} /> */}
      <EgmInfo show={showEgmInfo} close={egmInfoClose} slot={slot} />
      <section style={{ display: showSelectAction ? 'block' : 'none', ...rwd('100%', '25%') }} className={styles.container}>
        <div style={{ ...rwd('25%', '100%') }} className={styles.header}>
          <div className={styles['header-title']}>
            <span>{language[slot?.model] || slot?.model}</span>
            <div className={styles['header-icon-box']}>
              <ExclamationCircleOutline onClick={egmInfoOpen} />
              <CloseCircleOutline onClick={hidden} />
            </div>
          </div>

          <div className={styles['header-content']}>
            <Image
              className={styles['header-content-image']}
              src={getEgmImage({
                model: slot?.model || '',
                brandName: slot?.brandName || '',
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
              <button type="button" onClick={() => selectEgmHandler(slot?.egmId)} className={styles['start-btn']}>
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

        {(slot?.brandName === 'sammy' || slot?.brandName === 'daito')
          && (
            <div className={styles.body}>
              <div className={styles['body-title']}>
                <span className={styles.text}>{language.slotInfo}</span>
                <span className={styles.time}>
                  <ClockCircleOutline />
                  <span>{language.today}</span>
                </span>
              </div>
              <div className={styles['body-current-data']}>
                {[['Games', jpSlot?.games || ''],
                  ['TotalGames', jpSlot?.totalGames || ''],
                  ['Average', '1/166'],
                ].map((item) => (
                  <div className={styles.statistics}>
                    <div>{item[0]}</div>
                    <div>{item[1]}</div>
                  </div>
                ))}
              </div>
              <div className={styles['body-chart']}>
                <BouncingDown onClick={() => {
                  // eslint-disable-next-line max-len
                  setFetchBonus((prev) => ({ ...prev, status: true, page: prev.page <= 0 ? 0 : prev.page - 1 }));
                }}
                />
                <Bricks data={brickRef.current} game={jpSlot?.games || ''} totalGame={jpSlot?.totalGames || ''} />
                <BouncingDown onClick={() => {
                  setFetchBonus((prev) => ({ ...prev, status: true, page: prev.page + 1 }));
                }}
                />
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
            </div>)}
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
