import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';

import { gsap } from 'gsap';

import PropTypes from 'prop-types';

// Antd
import { Dialog } from 'antd-mobile';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import Wrapper from './Wrapper';
import Menu from '../Menu';
import Video from '../../Video';
import MainBtn from './MainBtn';
import SubBtn from './SubBtn';
import CashInOutBtn from './CashInOutBtn';
import AftForm from '../../aft-form/AftForm';

// Actions
import {
  buttonPress,
  cashInOut,
  clearCashInOutStatus,
  clearButtonPressStatus,
} from '../../../store/actions/egmActions';

// Hooks
import useDidUpdateEffect from '../../../hooks/useDidUpdatedEffect';

// Types
import { egmActionTypes } from '../../../store/types';

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

// eslint-disable-next-line
const Aristocrat = ({ model, image }) => {
  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isCashInOutClick, setIsCashInOutClick] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [allowSendBtnPressReq, setAllowSendBtnPressReq] = useState(true);

  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  // Redux
  const dispatch = useDispatch();

  const { data: userData } = useSelector((state) => state.user);
  const { online } = userData || {};
  // eslint-disable-next-line
  const { online_id: onlineId, point } = online || {};

  const { data: aftFormData } = useSelector((state) => state.aftForm);
  const { aftType, currentAmount, selectChipType } = aftFormData || {};

  const { data: selectEgmData, currentBtnPress } = useSelector(
    (state) => state.selectEgm,
  );
  const { buttonList, ip, stream_url: url } = selectEgmData || {};

  const { error: btnPressError } = useSelector((state) => state.egmButtonPress);

  const {
    error: aftError,
    isLoading: aftLoading,
    data: aftData,
  } = useSelector((state) => state.cashInOut);

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

      return;
    }
    if (!allowSendBtnPressReq) return;
    setAllowSendBtnPressReq(false);
    switch (name) {
      case 'spin':
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
    }, 3000);
  };

  // Auto Spin
  const autoSpinHandler = useCallback(() => {
    dispatch(buttonPress({ code: currentBtnPress, ip }));
    intervalID.current = setInterval(() => {
      dispatch(buttonPress({ code: currentBtnPress, ip }));
    }, 3000);
  }, [dispatch, ip, currentBtnPress]);

  // Stop Auto Spin
  const stopAutoSpinHandler = useCallback(() => {
    clearInterval(intervalID.current);
  }, [intervalID]);

  // 跳過第一次render，只有showSubBtn改變才執行動畫邏輯
  useDidUpdateEffect(() => {
    const tl = gsap.timeline();

    if (showSubBtn) {
      tl.to(subBtnRef.current, {
        y: '-75%',
        duration: 0.4,
        ease: 'ease.out',
      }).to(subBtnRef.current, {
        y: '-70%',
        duration: 1,
        ease: 'bounce.out',
      });
    }

    if (!showSubBtn) {
      tl.to(subBtnRef.current, {
        y: '-75%',
        duration: 0.3,
        ease: 'ease.in',
      }).to(subBtnRef.current, {
        y: '5%',
        duration: 1.2,
        ease: 'bounce.out',
      });
    }
  }, [showSubBtn]);

  // Sub Button Press
  const subBtnClickHandler = ({ name, code, spinEffect }) => {
    if (currentSubBtn) return;
    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    // 如果是bet按鈕才紀錄
    if (spinEffect === 1) {
      dispatch({
        type: egmActionTypes.SETUP_CURRENT_BTN_PRESS,
        payload: { currentBtnCode: code },
      });
    }

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 3000);
  };

  // Aft Submit Call Api
  const aftSubmitHandler = () => {
    const data = {
      cashAmount: currentAmount,
      ip,
      onlineId,
      type: aftType,
      chipType: selectChipType,
    };

    dispatch(cashInOut(data));
  };

  // 如果有aft form data , 就call開洗分api
  useEffect(() => {
    if (aftFormData) {
      aftSubmitHandler();
    }
    // eslint-disable-next-line
  }, [aftFormData]);

  // 開洗分成功
  useEffect(() => {
    if (aftData) {
      let text;
      if (aftType === 'aft-in') {
        text = '開分';
      }

      if (aftType === 'aft-out') {
        text = '洗分';
      }
      Dialog.alert({
        content: `${text}成功`,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearCashInOutStatus());
          setIsCashInOutClick(false);
        },
      });
    }
  }, [aftData, dispatch, aftType]);

  // 按鈕錯誤
  useEffect(() => {
    if (btnPressError) {
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

  // 開洗分錯誤
  useEffect(() => {
    if (aftError) {
      setIsCashInOutClick(false);
      Dialog.alert({
        content: aftError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearCashInOutStatus());
          setIsCashInOutClick(false);
        },
      });
    }
  }, [aftError, dispatch]);

  return (
    <Wrapper img={image} className={styles.container} model={model}>
      {/* 開洗分表單 */}
      <AftForm
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
        aftLoading={aftLoading}
        point={point}
      />

      {/* Menu */}
      <section style={{ paddingLeft: '1rem', paddingTop: '5px' }}>
        <Menu visible={showMenu} setVisible={setShowMenu} />
      </section>

      {/* Video */}
      <section className={styles['video-box']}>
        <Video rtcUrl={url} />
      </section>

      {/* CashInOut Button */}
      <CashInOutBtn
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
      />

      {/* Main Button */}
      <section className={styles['main-btn-box']}>
        <MainBtn
          mainBtnHandler={mainBtnHandler}
          autoSpinHandler={autoSpinHandler}
          stopAutoSpinHandler={stopAutoSpinHandler}
          mainBtnClick={mainBtnClick}
          setMainBtnClick={setMainBtnClick}
          isAuto={isAuto}
          setIsAuto={setIsAuto}
        />
      </section>

      {/* Sub Button */}
      <section ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubBtn
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
};

// Aristocrat.defaultProps = {
//   model: 'koi',
// };

export default Aristocrat;
