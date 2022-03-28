import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';

import PropTypes from 'prop-types';

// Antd
import { Dialog, Toast } from 'antd-mobile';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import Wrapper from './Wrapper';
import Menu from '../Menu';
import Video from '../../Video';
import MainBtn from './MainBtn';
import SubBtn from './SubBtn';
import CashInOutBtn from './CashInOutBtn';

// Actions
import {
  buttonPress,
  clearButtonPressStatus,
} from '../../../store/actions/egmActions';

// Types
import { egmActionTypes } from '../../../store/types';

// Config
import { apiConfig } from '../../../apis';

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

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
}) => {
  console.log('aristocrat');
  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [isAuto, setIsAuto] = useState(false);
  const [allowSendBtnPressReq, setAllowSendBtnPressReq] = useState(true);
  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  const [playStatus, setPlayStatus] = useState('');
  const [playVideo, setPlayVideo] = useState(false);

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

      setIsAuto(false);

      return;
    }

    if (!allowSendBtnPressReq) return;

    setAllowSendBtnPressReq(false);

    switch (name) {
      case 'spin':
        dispatch(buttonPress({ code: currentBtnPress, ip }));
        break;

      case 'auto':
        dispatch(buttonPress({ code: currentBtnPress, ip }));
        break;

      case 'max':
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

    setTimeout(() => {
      setAllowSendBtnPressReq(true);
    }, apiConfig.apiTimeSpace);
  };

  // Auto Spin Cal Api
  const autoSpinHandler = useCallback(() => {
    intervalID.current = setInterval(() => {
      dispatch(buttonPress({ code: currentBtnPress, ip }));
    }, apiConfig.apiTimeSpace);
  }, [dispatch, ip, currentBtnPress]);

  // Stop Auto Spin
  const stopAutoSpinHandler = useCallback(() => {
    clearInterval(intervalID.current);
  }, [intervalID]);

  // Sub Button Press call api
  const subBtnClickHandler = ({ name, code, spinEffect }) => {
    if (currentSubBtn || !allowSendBtnPressReq) return;

    setAllowSendBtnPressReq(false);

    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    let timer;

    // 如果是bet按鈕才紀錄
    if (spinEffect === 1) {
      timer = apiConfig.apiTimeSpace;
      dispatch({
        type: egmActionTypes.SETUP_CURRENT_BTN_PRESS,
        payload: { currentBtnCode: code },
      });
    }

    if (spinEffect !== 1) {
      timer = apiConfig.apiShortTimeSpace;
    }

    setTimeout(() => {
      setCurrentSubBtn('');
      setAllowSendBtnPressReq(true);
    }, timer);
  };

  // Auto Spin handle
  useEffect(() => {
    if (isAuto) {
      autoSpinHandler();
    }

    if (!isAuto) {
      stopAutoSpinHandler();
    }
  }, [isAuto, autoSpinHandler, stopAutoSpinHandler]);

  // 按鈕錯誤
  useEffect(() => {
    if (btnPressError) {
      setAllowSendBtnPressReq(true);
      setMainBtnClick({ auto: false, max: false, spin: false });
      setIsAuto(false);
      Dialog.alert({
        content: btnPressError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearButtonPressStatus());
        },
      });
    }
  }, [btnPressError, dispatch]);

  // 視訊播放狀態
  useEffect(() => {
    Toast.clear();

    Toast.config({
      position: 'center',
      duration: 0,
    });

    if (playStatus === 'loading') {
      Toast.show({
        icon: 'loading',
        content: '視訊加载中…',
      });
    }

    if (playStatus === 'wait') {
      Toast.show({
        icon: 'loading',
        content: '視訊等待中…',
      });
    }

    if (playStatus === 'error') {
      Toast.show({
        icon: 'fail',
        content: '視訊出錯了',
      });

      if (playStatus === 'stalled') {
        Toast.show({
          icon: 'fail',
          content: '視訊格式無法使用',
        });
      }
    }
  }, [playStatus]);

  const clickPlayHandler = () => {
    setPlayVideo(true);
  };

  return (
    <Wrapper img={image} className={styles.container} model={model}>
      <section style={{ padding: '1rem' }}>
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
            clickPlayHandler();
          }}
        >
          點擊後開始播放
        </button>
      )}

      {/* CashInOut Button */}
      <CashInOutBtn
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
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
      <section ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubBtn
          subBtnRef={subBtnRef.current}
          showSubBtn={showSubBtn}
          setShowSubBtn={setShowSubBtn}
          buttonList={buttonList || []}
          currentSubBtn={currentSubBtn}
          subBtnClickHandler={subBtnClickHandler}
        />
      </section>
    </Wrapper>
  );
};

Aristocrat.propTypes = {
  model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  getSdkRef: PropTypes.func.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  isCashInOutClick: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  ip: PropTypes.string.isRequired,
  currentBtnPress: PropTypes.string,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
};

Aristocrat.defaultProps = {
  currentBtnPress: null,
};

export default Aristocrat;
