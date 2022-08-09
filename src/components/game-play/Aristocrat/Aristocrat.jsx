import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';

// Prop-Type
import PropTypes from 'prop-types';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { store } from '../../../store';
import { showWarningWindow } from '../../../store/actions/warningAction';

// Components
import Wrapper from '../Wrapper';
import Menu from '../Menu';
import Video from '../../Video';
import MainBtn from './MainBtn';
import CashInOutBtn from './CashInOutBtn';
import SubHolder from '../SubBtnHolder';

// Actions
import {
  buttonPress,
  clearButtonPressStatus,
} from '../../../store/actions/egmActions';

// Types
import { egmActionTypes } from '../../../store/types';

// Config
import { apiConfig } from '../../../apis';

// Helpers
import { getSubBtnImg, getSubBtnImgSelect } from '../../../utils/helper';

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

// Config
import styleConfig from '../../../config/styleConfig';

const Aristocrat = ({
  model,
  image,
  getSdkRef,
  setIsCashInOutClick,
  isCashInOutClick,
  url,
  buttonList,
  ip,
  currentBtnPress,
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
  isAuto,
  setIsAuto,
  // showAutoForm,
  setShowAutoForm,

}) => {
  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  // Redux
  const dispatch = useDispatch();

  const { error: btnPressError } = useSelector((state) => state.egmButtonPress);

  // Ref
  const subBtnRef = useRef();
  const intervalID = useRef();

  // Main Button Press Call api
  const mainBtnHandler = ({ name, code }) => {
    if (!currentBtnPress) {
      Dialog.alert({
        content: '請先選擇倍率按鈕',
        closeOnMaskClick: true,
        confirmText: '確定',
      });

      setIsAuto({ action: false, limit: null });
      store.dispatch(showWarningWindow('on', 'warning', () => {}, '請先選擇倍率按鈕'));
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
      store.dispatch(showWarningWindow('on', 'warning', () => {}, '按鈕錯誤'));
    }
  };

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

<<<<<<< HEAD
=======
  const confirmBtnAction = () => {
    dispatch(clearButtonPressStatus());
  };

  useEffect(() => {
    if (btnPressError) {
      store.dispatch(showWarningWindow('on', 'warning', confirmBtnAction, btnPressError));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnPressError]);
>>>>>>> edb0650 (彈出視窗fixed)
  return (
    <>
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
        <CashInOutBtn
          isCashInOutClick={isCashInOutClick}
          setIsCashInOutClick={setIsCashInOutClick}
          setIsAuto={setIsAuto}
        />

        {/* Main Button */}
        <section className={styles['main-btn-box']}>
          <MainBtn
            mainBtnHandler={mainBtnHandler}
            mainBtnClick={mainBtnClick}
            setMainBtnClick={setMainBtnClick}
            isAuto={isAuto}
            setIsAuto={setIsAuto}
          />
        </section>

        {/* Sub Button */}
        <section
          style={{ zIndex: styleConfig.zIndex.max }}
          ref={subBtnRef}
          className={styles['sub-btn-box']}
        >
          <SubHolder
            subBtnRef={subBtnRef.current}
            showSubBtn={showSubBtn}
            setShowSubBtn={setShowSubBtn}
            currentSubBtn={currentSubBtn}
            subBtnClickHandler={subBtnClickHandler}
            subBtnEl={subBtnEl}
          />
        </section>
      </Wrapper>
    </>
  );
};

Aristocrat.propTypes = {
  model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  getSdkRef: PropTypes.func.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  isCashInOutClick: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  // buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttonList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ip: PropTypes.string.isRequired,
  currentBtnPress: PropTypes.string,
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
  isAuto: PropTypes.shape({
    action: PropTypes.bool.isRequired,
    limit: PropTypes.number,
  }).isRequired,
  setIsAuto: PropTypes.func.isRequired,
  // showAutoForm: PropTypes.bool.isRequired,
  setShowAutoForm: PropTypes.func.isRequired,
};

Aristocrat.defaultProps = {
  currentBtnPress: null,
};

export default Aristocrat;
