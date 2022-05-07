import React, { useState, useCallback, useMemo } from 'react';

// Lodash
import throttle from 'lodash.throttle';

// Redux
import { useDispatch } from 'react-redux';

// Prop-Type
import PropTypes from 'prop-types';

// classnames
import classnames from 'classnames';

// Css in Js
import styled from 'styled-components';

// actions
import {
  // eslint-disable-next-line
  buttonPress,
  buttonPressDemo,
} from '../../../store/actions/egmActions';

// Helpers
import { getMainBtnImg, getCoinBtnImg } from '../../../utils/helper';

// Components
import Wrapper from '../Wrapper';
import Video from '../../Video';
import GameHeader from '../game-heder/GameHeader';
// import Menu from '../Menu';

// Styles
import styles from './Sammy.module.scss';

const BetBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const AutoBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CashInBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CashOutBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CashMoveBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CoinBtn = styled.div`
  background-image: ${({ brand, model }) => `url(${getCoinBtnImg({ brand, model })})`};
`;

const SpinBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const Sammy = ({
  image,
  model,
  name,
  // showMenu,
  // setShowMenu,
  // exitGameHandler,
  url,
  playVideo,
  setPlayVideo,
  playStatus,
  setPlayStatus,
  getSdkRef,
  ip,
  brand,
}) => {
  const [spin, setSpin] = useState(false);
  const [topBtn, setTopBtn] = useState({
    bet: false,
    auto: false,
    cashIn: false,
    cashOut: false,
    cashMove: false,
  });

  const [stop, setStop] = useState({
    left: { action: false, code: 'stop1' },
    center: { action: false, code: 'stop2' },
    right: { action: false, code: 'stop3' },
  });

  // Redux
  const dispatch = useDispatch();

  const btnPressApiHandler = useCallback(
    (code) => {
      // dispatch(buttonPress({ ip, code }));  // 正式，不要刪除
      dispatch(buttonPressDemo({ ip, code })); // 測試用
    },
    [dispatch, ip],
  );

  const throttledBtnPress = useMemo(
    () => throttle(btnPressApiHandler, 1000),
    [btnPressApiHandler],
  );

  const onSpinClick = () => {
    setSpin(true);
    throttledBtnPress('spin');
    setTimeout(() => {
      setSpin(false);
    }, 400);
  };

  const onTopBtnClick = ({ target }) => {
    setTopBtn((prev) => ({
      ...prev,
      [target.id]: true,
    }));

    setTimeout(() => {
      setTopBtn((prev) => ({
        ...prev,
        [target.id]: false,
      }));
    }, 300);
  };

  const onStopClick = ({ target }) => {
    setStop((prev) => ({
      ...prev,
      [target.id]: { ...prev[target.id], action: true },
    }));

    // dispatch(buttonPress({ ip, code: stop[target.id].code })); // 正式，不要刪除
    dispatch(buttonPressDemo({ ip, code: stop[target.id].code })); // 測試用

    setTimeout(() => {
      setStop((prev) => ({
        ...prev,
        [target.id]: { ...prev[target.id], action: false },
      }));
    }, 200);
  };

  console.log(playStatus, 'playstatus');

  return (
    <>
      <GameHeader />

      <Wrapper jp img={image} className={styles.container} model={model}>
        <section type={name} className={styles['video-box']}>
          <Video
            rtcUrl={url}
            play={playVideo}
            setPlayStatus={setPlayStatus}
            getSdkRef={getSdkRef}
          />
        </section>

        {playStatus === 'canPlay' && (
          <button
            type="button"
            style={{
              width: '10rem',
              height: '10rem',
              backgroundColor: 'transparent',
              color: 'white',
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            onClick={() => {
              setPlayVideo(true);
            }}
          >
            點擊後開始播放
          </button>
        )}

        <section className={styles['btn-box']}>
          <div className={styles.content}>
            {/* Top Btn */}
            <div className={styles['top-btn-box']}>
              <BetBtn
                id="bet"
                type={name}
                name="bet"
                brand={brand}
                model={model}
                onClick={onTopBtnClick}
                className={`
                ${styles.bet} 
                ${styles['top-btn']} 
                ${classnames({ [styles['top-circe-btn-move']]: topBtn.bet })}
                `}
              />

              <AutoBtn
                id="auto"
                type={name}
                name="auto"
                brand={brand}
                model={model}
                onClick={onTopBtnClick}
                className={`
                ${styles.auto} 
                ${styles['top-btn']} 
                ${classnames({ [styles['top-circe-btn-move']]: topBtn.auto })}
                `}
              />

              <CashInBtn
                id="cashIn"
                type={name}
                name="cash-in"
                brand={brand}
                model={model}
                onClick={onTopBtnClick}
                className={`
                ${styles['cash-in']} 
                ${styles['top-btn']}
                ${classnames({
                  [styles['top-square-btn-move']]: topBtn.cashIn,
                })}
                `}
              />

              <CashOutBtn
                id="cashOut"
                name="cash-out"
                brand={brand}
                model={model}
                onClick={onTopBtnClick}
                className={`
                ${styles['cash-out']} 
                ${styles['top-btn']} 
                ${classnames({
                  [styles['top-square-btn-move']]: topBtn.cashOut,
                })}

                `}
              />

              <CashMoveBtn
                id="cashMove"
                name="cash-move"
                brand={brand}
                model={model}
                onClick={onTopBtnClick}
                className={`
                ${styles['cash-move']} 
                ${styles['top-btn']} 
                ${classnames({
                  [styles['top-square-btn-move']]: topBtn.cashMove,
                })}

                `}
              />

              <CoinBtn
                brand={brand}
                model={model}
                className={`${styles.coin} ${styles['top-btn']}`}
              />
            </div>

            {/* Button Btn */}
            <div className={styles['bottom-btn-box']}>
              {/* Spin */}
              <SpinBtn
                type={name}
                role="presentation"
                onClick={onSpinClick}
                name="spin"
                brand={brand}
                model={model}
                className={`${styles.spin} ${classnames({
                  [styles['spin-move']]: spin,
                })}`}
              />

              {/* Stop */}
              <div className={styles['stop-btn-box']}>
                <div
                  onClick={onStopClick}
                  role="presentation"
                  id="left"
                  className={`${styles.stop} ${classnames({
                    [styles['stop-move']]: stop.left.action,
                  })}`}
                />
                <div
                  onClick={onStopClick}
                  role="presentation"
                  id="center"
                  className={`${styles.stop} ${classnames({
                    [styles['stop-move']]: stop.center.action,
                  })}`}
                />
                <div
                  onClick={onStopClick}
                  role="presentation"
                  id="right"
                  className={`${styles.stop} ${classnames({
                    [styles['stop-move']]: stop.right.action,
                  })}`}
                />
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
};

Sammy.propTypes = {
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  // showMenu: PropTypes.bool.isRequired,
  // setShowMenu: PropTypes.func.isRequired,
  // exitGameHandler: PropTypes.func.isRequired,
  getSdkRef: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  playStatus: PropTypes.string.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  playVideo: PropTypes.bool.isRequired,
  setPlayVideo: PropTypes.func.isRequired,
  ip: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
};

export default Sammy;
