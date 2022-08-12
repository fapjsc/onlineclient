/* eslint-disable react/jsx-no-undef */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';

import throttle from 'lodash.throttle';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop-Type
import PropTypes from 'prop-types';

// classnames
import classnames from 'classnames';

import styled from 'styled-components';

import { store } from '../../../store';

import { showWarningWindow } from '../../../store/actions/warningAction';

// actions
// eslint-disable-next-line
import { DatePickerView } from 'antd-mobile';
import {
  // eslint-disable-next-line
  buttonPress,
  buttonPressDemo,
  buttonPressToEGMCashInOut,
  clearButtonPressStatus,
} from '../../../store/actions/egmActions';

// Helpers
import { getMainBtnImg } from '../../../utils/helper';

// Components
import Wrapper from '../Wrapper';
// import Menu from '../Menu';
import Video from '../../Video';
import GameHeader from '../game-heder/GameHeader';

// Styles
import styles from './Daito.module.scss';

// eslint-disable-next-line
const SpinBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;
// eslint-disable-next-line
const MaxBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

// eslint-disable-next-line
const AutoBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;
// eslint-disable-next-line
const CoinInBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

// eslint-disable-next-line
const CoinOutBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

// eslint-disable-next-line
const CoinBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const Daito = ({
  image,
  model,
  name,
  // showMenu,
  //setShowMenu,
  exitGameHandler,
  url,
  playVideo,
  setPlayVideo,
  playStatus,
  setPlayStatus,
  getSdkRef,
  ip,
  brand,
}) => {
  // eslint-disable-next-line
  const [spin, setSpin] = useState(false);

  const [max, setMax] = useState(false);
  // eslint-disable-next-line
  const [auto, setAuto] = useState(false);
  const [coinIn, setCoinIn] = useState(false);
  const [coinOut, setCoinOut] = useState(false);
  const [stop, setStop] = useState({
    left: { action: false, code: 'stop1' },
    center: { action: false, code: 'stop2' },
    right: { action: false, code: 'stop3' },
  });

  // Redux
  const dispatch = useDispatch();

  // const { error: btnPressError } = useSelector((state) => state.egmButtonPress);

  const { data: userData } = useSelector((state) => state.user);
  const { level: userLevel, member_account: userName } = userData || {};
  const { error: btnPressError } = useSelector((state) => state.egmButtonPress);

  const { data } = useSelector((state) => state.selectEgm);
  const { id: egmId } = data || {};

  const { data: egmList } = useSelector((state) => state.egmList);

  const sammyItem = egmList?.find((el) => el.id === egmId) || {};

  const egmID = sammyItem?.id;

  const { jpSlot } = sammyItem || {};
  const point = jpSlot?.coinPurse;

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

  // eslint-disable-next-line
  const onSpinClick = () => {
    setSpin(true);
    throttledBtnPress('spin');
    setTimeout(() => {
      setSpin(false);
    }, 400);
  };

  const onCoinInClick = () => {
    setCoinIn(true);
    dispatch(buttonPressToEGMCashInOut({ type: 'coinIn', egmId }));
    setTimeout(() => {
      setCoinIn(false);
    }, 400);
  };

  const onCoinOutClick = () => {
    setCoinOut(true);
    dispatch(buttonPressToEGMCashInOut({ type: 'coinOut', egmId }));
    setTimeout(() => {
      setCoinOut(false);
    }, 400);
  };

  const onMaxClick = () => {
    setMax(true);
    throttledBtnPress('10');
    setTimeout(() => {
      setMax(false);
    }, 200);
  };

  const onAutoClick = () => {
    setAuto(true);
    // throttledBtnPress('10');
    setTimeout(() => {
      setAuto(false);
    }, 200);
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

  const confirmBtnAction = () => {
    dispatch(clearButtonPressStatus());
  };

  useEffect(() => {
    if (btnPressError) {
      setAuto(false);
      store.dispatch(showWarningWindow('on', 'warning', confirmBtnAction, btnPressError));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnPressError]);

  return (
    <>
      <GameHeader
        exitGameHandler={exitGameHandler}
        point={point}
        egmName={name}
        egmID={egmID}
        userLevel={userLevel}
        userName={userName}
        brand={brand}
      />
      <div className={styles.bonusInfo}>
        <div>
          <div>大當</div>
          <div>1</div>
        </div>
        <div>
          <div>確變</div>
          <div>1</div>
        </div>
        <div>
          <div>場次</div>
          <div>{1 || jpSlot?.games}</div>
        </div>
      </div>
      <Wrapper jp img={image} className={styles.container} model={model}>
        <section type={name} className={styles['video-box']}>
          <Video
            rtcUrl={url}
            play={playVideo}
            setPlayStatus={setPlayStatus}
            getSdkRef={getSdkRef}
          />
          <div className={styles.middle}>
            <div className={styles.middleContainer}>
              <div>
                <p>CREDIT</p>
                <p>50</p>
              </div>
              <img
                alt="hi"
                role="presentation"
                src={require(`../../../assets/日本slot/素材/吉宗_押注燈${1}.png`)}
              />
              <div>
                <p>TOTAL</p>
                <p>20456</p>
              </div>
              <div>
                <p>WIN</p>
                <p>50</p>
              </div>
              <img
                style={{
                  height: '40%',
                }}
                alt="hi"
                role="presentation"
                src={require(`../../../assets/日本slot/素材/吉宗_燈${1}.png`)}
              />
            </div>
          </div>
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

            <div className={styles.top}>

              <MaxBtn
                type={name}
                role="presentation"
                onClick={onMaxClick}
                name="max"
                brand={brand}
                model={model}
                className={`${styles.max} ${classnames({
                  [styles['max-move']]: max,
                })}`}
              />

              <AutoBtn
                type={name}
                role="presentation"
                onClick={onAutoClick}
                name="auto"
                brand={brand}
                model={model}
                className={`${styles.auto} ${classnames({
                  [styles['max-move']]: auto,
                })}`}
              />

              {/* <CashInOutBtn
              type={name}
              role="presentation"
              name="credit"
              brand={brand}
              model={model}
              className={`${styles.credit} ${classnames({
                [styles['credit-move']]: credit,
              })}`}
              onClick={onCreditClick}
            /> */}

              <CoinInBtn
                type={name}
                role="presentation"
                name="coinIn"
                brand={brand}
                model={model}
                className={`${styles['coin-in']} ${classnames({
                  [styles['coin-move']]: coinIn,
                })}`}
                onClick={onCoinInClick}
              />

              <CoinOutBtn
                type={name}
                role="presentation"
                name="coinOut"
                brand={brand}
                model={model}
                className={`${styles['coin-out']} ${classnames({
                  [styles['coin-move']]: coinOut,
                })}`}
                onClick={onCoinOutClick}
              />

              {/* <CoinBtn
                type={name}
                name="coin"
                brand={brand}
                model={model}
                className={styles['coin-slot']}
              /> */}

            </div>

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
        </section>
      </Wrapper>
    </>
  );
};

Daito.propTypes = {
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  // showMenu: PropTypes.bool.isRequired,
  // setShowMenu: PropTypes.func.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
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

export default Daito;
