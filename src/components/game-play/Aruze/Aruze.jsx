import React, {
  useRef, useState, useMemo, useCallback,
} from 'react';

// Lodash
import throttle from 'lodash.throttle';

// Redux
import { useDispatch } from 'react-redux';

// Prop-Type
import PropTypes from 'prop-types';

// Actions
import { buttonPress } from '../../../store/actions/egmActions';

// Components
import Wrapper from '../Wrapper';
import MainBtn from './MainBtn';
import SubBtnHolder from '../SubBtnHolder';
import Video from '../../Video';
import Menu from '../Menu';

// Helpers
import { getSubBtnImg, getSubBtnImgSelect } from '../../../utils/helper';

// Styles
import styles from './Aruze.module.scss';

const buttonList = [
  { id: 1, button_name: 'bet-1', code: '0' },
  { id: 2, button_name: 'bet-3', code: '1' },
  { id: 3, button_name: 'bet-5', code: '2' },
  { id: 4, button_name: 'bet-7', code: '3' },
  { id: 5, button_name: 'bet-9', code: '4' },
  { id: 6, button_name: 'bet-25', code: '5' },
  { id: 7, button_name: 'bet-40', code: '6' },
  { id: 8, button_name: 'bet-50', code: '7' },
  { id: 9, button_name: 'bet-75', code: '8' },
  { id: 10, button_name: 'bet-80', code: '9' },
];

const Aruze = ({
  // model,
  image,
  getSdkRef,
  setIsCashInOutClick,
  // isCashInOutClick,
  url,
  // buttonList,
  ip,
  // currentBtnPress,
  setShowMenu,
  showMenu,
  exitGameHandler,
  setPlayStatus,
  playStatus,
  playVideo,
  setPlayVideo,
  showSubBtn,
  setShowSubBtn,
  currentSubBtn,
  setCurrentSubBtn,
}) => {
  // Init State
  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  // Redux
  const dispatch = useDispatch();

  // Ref
  const subBtnRef = useRef();

  const btnPressApiHandler = useCallback(
    ({ code, name }) => {
      dispatch(buttonPress({ ip, code, name }));
    },
    [dispatch, ip],
  );

  const throttledBtnPress = useMemo(
    () => throttle(btnPressApiHandler, 1000),
    [btnPressApiHandler],
  );

  const mainBtnHandler = ({ name, code }) => {
    console.log(name, code, ip);
    throttledBtnPress({ code, name });
  };

  // eslint-disable-next-line
  const subBtnClickHandler = ({ name, code, spinEffect }) => {
    if (currentSubBtn) return;
    setCurrentSubBtn(name);

    throttledBtnPress({ code, name });

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 800);
  };

  const subBtnEl = buttonList
    .sort((a, b) => a.sequence - b.sequence)
    .map((btn) => {
      const { button_name: name, code, spin_effect: spinEffect } = btn || {};
      const imgObj = getSubBtnImg({ name, brand: 'aruze' });
      const imgObjSelect = getSubBtnImgSelect({ name, brand: 'aruze' });
      return (
        <div
          key={name}
          role="presentation"
          className={styles['sub-btn']}
          onClick={() => subBtnClickHandler({ code, name, spinEffect })}
          style={{
            backgroundImage: `url(${imgObj}), url(${imgObjSelect})`,
            backgroundSize: currentSubBtn === name ? '0 0,75%' : '75%, 0 0',
            transform:
              currentSubBtn === name && 'translateY(-10px) scale(1.15)',
          }}
        />
      );
    });

  return (
    <Wrapper img={image} className={styles.container}>
      {/* Menu */}
      <section className={styles['menu-box']}>
        <Menu
          visible={showMenu}
          setVisible={setShowMenu}
          exitGameHandler={exitGameHandler}
        />
      </section>

      {/* Video */}
      <section className={styles['video-box']}>
        <div className={styles['button-box']}>
          <Video
            rtcUrl={url}
            play={playVideo}
            setPlayStatus={setPlayStatus}
            getSdkRef={getSdkRef}
          />
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
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
          onClick={() => {
            setPlayVideo(true);
          }}
        >
          點擊後開始播放
        </button>
      )}

      {/* Aft Button */}
      <section className={styles['cash-in-out-box']}>
        <div
          className={styles['cash-in-out-btn']}
          role="presentation"
          onClick={() => setIsCashInOutClick(true)}
        />
      </section>

      {/* Money counter */}
      <section className={styles['money-counter-box']}>
        <div
          className={`${styles['money-counter']} ${styles['money-counter-animation']}`}
        />
      </section>

      {/* Main Button */}
      <section className={styles['main-btn-box']}>
        <MainBtn
          // mainBtnHandler={mainBtnHandler}
          mainBtnClick={mainBtnClick}
          setMainBtnClick={setMainBtnClick}
          mainBtnHandler={mainBtnHandler}
        />
      </section>

      {/*  Sub Button */}
      <section ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubBtnHolder
          subBtnRef={subBtnRef.current}
          showSubBtn={showSubBtn}
          setShowSubBtn={setShowSubBtn}
          currentSubBtn={currentSubBtn}
          subBtnClickHandler={subBtnClickHandler}
          subBtnEl={subBtnEl}
        />
      </section>
    </Wrapper>
  );
};

Aruze.propTypes = {
  // model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  getSdkRef: PropTypes.func.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  // isCashInOutClick: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  // buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  ip: PropTypes.string.isRequired,
  // currentBtnPress: PropTypes.string,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  playStatus: PropTypes.string.isRequired,
  playVideo: PropTypes.bool.isRequired,
  setPlayVideo: PropTypes.func.isRequired,
  showSubBtn: PropTypes.bool.isRequired,
  setShowSubBtn: PropTypes.func.isRequired,
  currentSubBtn: PropTypes.string.isRequired,
  setCurrentSubBtn: PropTypes.func.isRequired,
};

Aruze.defaultProps = {
  // currentBtnPress: null,
};

export default Aruze;
