import React, { useState, useCallback, useMemo } from 'react';

import throttle from 'lodash.throttle';

// Redux
import { useDispatch } from 'react-redux';

// Prop-Type
import PropTypes from 'prop-types';

// classnames
import classnames from 'classnames';

import styled from 'styled-components';

// actions
import {
  // eslint-disable-next-line
  buttonPress,
  buttonPressDemo,
} from '../../../store/actions/egmActions';

// Helpers
import { getMainBtnImg } from '../../../utils/helper';

// Components
import Wrapper from '../Wrapper';
import Menu from '../Menu';
import Video from '../../Video';

// Styles
import styles from './Sammy.module.scss';

const SpinBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const MaxBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CashInOutBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const CoinBtn = styled.div`
  background-image: ${({ name, brand, model }) => `url(${getMainBtnImg({ name, brand, model })})`};
`;

const Sammy = ({
  image,
  model,
  name,
  showMenu,
  setShowMenu,
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
  const [spin, setSpin] = useState(false);
  const [max, setMax] = useState(false);
  const [credit, setCredit] = useState(false);
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

  const onCreditClick = () => {
    setCredit(true);
    setTimeout(() => {
      setCredit(false);
    }, 200);
  };

  const onMaxClick = () => {
    setMax(true);
    throttledBtnPress('10');
    setTimeout(() => {
      setMax(false);
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

  return (
    <Wrapper img={image} className={styles.container} model={model}>
      {/* Menu */}
      <section className={styles['menu-box']}>
        <div className={styles['menu-bg']}>
          <Menu
            visible={showMenu}
            setVisible={setShowMenu}
            exitGameHandler={exitGameHandler}
          />
        </div>
      </section>

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

          <CashInOutBtn
            type={name}
            role="presentation"
            name="credit"
            brand={brand}
            model={model}
            className={`${styles.credit} ${classnames({
              [styles['credit-move']]: credit,
            })}`}
            onClick={onCreditClick}
          />

          <CoinBtn
            type={name}
            name="coin"
            brand={brand}
            model={model}
            className={styles['coin-slot']}
          />

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
  );
};

Sammy.propTypes = {
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
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

export default Sammy;
