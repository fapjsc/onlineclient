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

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

const Aristocrat = ({ gameName }) => {
  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isCashInOutClick, setIsCashInOutClick] = useState(false);
  const [isAuto, setIsAuto] = useState(false);

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

  const { data: selectEgmData } = useSelector((state) => state.selectEgm);
  const { buttonList, ip } = selectEgmData || {};

  const { error: btnPressError } = useSelector((state) => state.egmButtonPress);

  const { error: aftError, isLoading: aftLoading } = useSelector(
    (state) => state.cashInOut,
  );

  // Ref
  const subBtnRef = useRef();
  const intervalID = useRef();

  // 跳過第一次render，只有showSubBtn 改變才執行動畫邏輯
  useDidUpdateEffect(() => {
    const tl = gsap.timeline();

    if (showSubBtn) {
      tl.to(subBtnRef.current, {
        y: '-80%',
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
        y: '-80%',
        duration: 0.3,
        ease: 'ease.in',
      }).to(subBtnRef.current, {
        y: '0%',
        duration: 1.2,
        ease: 'bounce.out',
      });
    }
  }, [showSubBtn]);

  // Auto Spin
  const autoSpinHandler = useCallback(() => {
    dispatch(buttonPress({ name: 'spin', code: 'spin', ip }));
    intervalID.current = setInterval(() => {
      dispatch(buttonPress({ name: 'spin', code: 'spin', ip }));
    }, 3000);
  }, [dispatch, ip]);

  // Stop Auto Spin
  const stopAutoSpinHandler = useCallback(() => {
    clearInterval(intervalID.current);
  }, [intervalID]);

  // Main Button Press
  const mainBtnHandler = ({ name, code }) => {
    dispatch(buttonPress({ name, code, ip }));
  };

  // Sub Button Press
  const subBtnClickHandler = ({ name, code }) => {
    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 800);
  };

  // Aft Submit
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

  // 如果有aft form data , 就call 開洗分api
  useEffect(() => {
    if (aftFormData) {
      aftSubmitHandler();
    }
    // eslint-disable-next-line
  }, [aftFormData]);

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
        },
      });
    }
  }, [aftError, dispatch]);

  return (
    <article className={`${styles.container} ${styles[gameName]}`}>
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
        <Video rtcUrl="webrtc://220.135.67.240/test/999" />
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
    </article>
  );
};

Aristocrat.propTypes = {
  gameName: PropTypes.string,
};

Aristocrat.defaultProps = {
  gameName: 'koi',
};

export default Aristocrat;
