import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';

// Prop-Type
import PropTypes from 'prop-types';

// Antd
import { Dialog } from 'antd-mobile';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Config
import { apiConfig } from '../../../apis';

// Helpers
import { getSubBtnImg, getSubBtnImgSelect } from '../../../utils/helper';

// components
import Wrapper from '../Wrapper';
import SubBtnHolder from '../SubBtnHolder';
import Menu from '../Menu';
import MainBtn from './MainBtn';
import Video from '../../Video';
// Types
import { egmActionTypes } from '../../../store/types';

// Actions
import {
  buttonPress,
  clearButtonPressStatus,
} from '../../../store/actions/egmActions';

// Styles
import styles from './Igt.module.scss';

// Config
import styleConfig from '../../../config/styleConfig';

// eslint-disable-next-line
const Igt = ({
  model,
  image,
  getSdkRef,
  setIsCashInOutClick,
  //   isCashInOutClick,
  url,
  buttonList,
  ip,
  setIsAuto,
  isAuto,
  setShowAutoForm,
  currentBtnPress,
  currentSubBtn,
  setCurrentSubBtn,
  setShowMenu,
  showMenu,
  exitGameHandler,
  setPlayStatus,
  playStatus,
  playVideo,
  setPlayVideo,
  //   showSubBtn,
  //   setShowSubBtn,
  //   currentSubBtn,
}) => {
  // Init State
  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });
  const { error: btnPressError } = useSelector((state) => state.egmButtonPress);
  const [showSubBtn, setShowSubBtn] = useState(false);
  const subBtnRef = useRef();
  const intervalID = useRef();

  // Redux
  const dispatch = useDispatch();
  // Main Button Press Call api
  const mainBtnHandler = ({ name, code }) => {
    if (!currentBtnPress) {
      Dialog.alert({
        content: '請先選擇倍率按鈕',
        closeOnMaskClick: true,
        confirmText: '確定',
      });

      setIsAuto({ action: false, limit: null });

      return;
    }

    switch (name) {
    case 'spin':
      setIsAuto({ action: false, limit: null });
      dispatch(buttonPress({ code: currentBtnPress, ip }));
      break;

    case 'auto':
      setShowAutoForm(true);
      setIsAuto({ action: false, limit: null });
      break;

    case 'max':
      setIsAuto({ action: false, limit: null });
      dispatch(buttonPress({ code, ip }));
      dispatch({
        type: egmActionTypes.SETUP_CURRENT_BTN_PRESS,
        payload: { currentBtnCode: code },
      });
      break;

    default:
      Dialog.alert({
        content: '按鈕錯誤',
        closeOnMaskClick: true,
        confirmText: '確定',
      });
    }
  };

  // Sub Button Press call api
  const subBtnClickHandler = ({ name, code, spinEffect }) => {
    if (currentSubBtn) return;

    setIsAuto({ action: false, limit: null });

    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    let timer;
    // 如果是line按鈕才紀錄
    if (spinEffect === 1) {
      timer = apiConfig.lineBtnTimeSpace;
      dispatch({
        type: egmActionTypes.SETUP_CURRENT_BTN_PRESS,
        payload: { currentBtnCode: code },
      });
    }

    if (spinEffect !== 1) {
      timer = apiConfig.betBtnTimeSpace;
    }
    setTimeout(() => {
      setCurrentSubBtn('');
    }, timer);
  };

  const subBtnEl = buttonList
  && buttonList
    ?.filter(
      (btn) => btn.button_name !== 'max' && btn.button_name !== 'take-win',
    )
    .sort((a, b) => a.sequence - b.sequence)
    .map((btn) => {
      const { button_name: name, code, spin_effect: spinEffect } = btn || {};
      const imgObj = getSubBtnImg({ name, brand: 'aristocrat' });
      const imgObjSelect = getSubBtnImgSelect({ name, brand: 'aristocrat' });
      return (
        <div
          key={name}
          style={{
            backgroundImage:
              currentSubBtn === name
                ? `url(${imgObjSelect})`
                : `url(${imgObj})`,
            transform:
              currentSubBtn === name && 'translateY(-10px) scale(1.15)',
          }}
          className={styles['sub-btn']}
          onClick={() => subBtnClickHandler({ code, name, spinEffect })}
          role="presentation"
        />
      );
    });

  // Auto Spin Cal Api
  const autoSpinHandler = useCallback(() => {
    intervalID.current = setInterval(() => {
      dispatch(buttonPress({ code: currentBtnPress, ip }));
    }, apiConfig.mainBtnApiTimeSpace);
  }, [dispatch, ip, currentBtnPress]);

  // Stop Auto Spin
  const stopAutoSpinHandler = useCallback(() => {
    clearInterval(intervalID.current);
  }, [intervalID]);

  // 按鈕錯誤
  useEffect(() => {
    if (btnPressError) {
      setMainBtnClick({ auto: false, max: false, spin: false });
      setIsAuto({ action: false, limit: null });
      Dialog.alert({
        content: btnPressError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearButtonPressStatus());
        },
      });
    }
  }, [btnPressError, dispatch, setIsAuto]);

  useEffect(() => {
    if (isAuto.action) {
      dispatch(buttonPress({ code: currentBtnPress, ip }));
      autoSpinHandler();
    }

    if (!isAuto.action) {
      stopAutoSpinHandler();
    }

    // eslint-disable-next-line
  }, [isAuto]);

  useEffect(() => {
    setShowAutoForm(true);
    setCurrentSubBtn('auto');
    setIsAuto({ action: true, limit: 19099090923 });
    // eslint-disable-next-line
  }, [ ]);

  return (
    <Wrapper img={image} className={styles.container} model={model}>
      <section className={styles['menu-box']}>
        <Menu
          visible={showMenu}
          setVisible={setShowMenu}
          exitGameHandler={exitGameHandler}
        />
      </section>

      {/* Video */}
      <section className={styles['video-box']}>
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

      {/* Main Button */}
      <section className={styles['main-btn-box']}>
        <MainBtn
          // mainBtnHandler={mainBtnHandler}
          mainBtnClick={mainBtnClick}
          setMainBtnClick={setMainBtnClick}
          mainBtnHandler={mainBtnHandler}
          setIsAuto={setIsAuto}
          isAuto={isAuto}
        />
      </section>

      {/*  Sub Button */}
      <section
        style={{ zIndex: styleConfig.zIndex.max }}
        ref={subBtnRef}
        className={styles['sub-btn-box']}
      >
        <SubBtnHolder
          subBtnRef={subBtnRef.current}
          showSubBtn={showSubBtn}
          setShowSubBtn={setShowSubBtn}
          currentSubBtn={currentSubBtn}
          subBtnClickHandler={subBtnClickHandler}
          subBtnEl={subBtnEl}
          height="-60%"
        />
      </section>
    </Wrapper>
  );
};

Igt.propTypes = {
  model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  getSdkRef: PropTypes.func.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  //   isCashInOutClick: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  ip: PropTypes.string.isRequired,
  setIsAuto: PropTypes.func.isRequired,
  isAuto: PropTypes.bool.isRequired,
  currentBtnPress: PropTypes.string,
  currentSubBtn: PropTypes.string.isRequired,
  setCurrentSubBtn: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  playStatus: PropTypes.string.isRequired,
  playVideo: PropTypes.bool.isRequired,
  setPlayVideo: PropTypes.func.isRequired,
  setShowAutoForm: PropTypes.func.isRequired,
  //   showSubBtn: PropTypes.bool.isRequired,
  //   setShowSubBtn: PropTypes.func.isRequired,
  //   currentSubBtn: PropTypes.string.isRequired,
};

Igt.defaultProps = {
  currentBtnPress: null,
};

export default Igt;
