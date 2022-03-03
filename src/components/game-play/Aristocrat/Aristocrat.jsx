import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// import classnames from 'classnames';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import Menu from '../Menu';
import Video from '../../Video';
import MainBtn from './MainBtn';
import SubBtn from './SubBtn';
// import subBtnHeaderImage from '../../../assets/button/sub-btn-header.png';

// Actions
import { buttonPress } from '../../../store/actions/egmActions';

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

// const subBtnList = [
//   'bet-1',
//   'bet-2',
//   'bet-5',
//   'bet-10',
//   'bet-15',
//   '1-1',
//   '1-2',
//   '1-3',
//   '1-4',
//   '1-5',
// ];

const Aristocrat = () => {
  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  // Main button 動畫邏輯判斷
  const [mainBtnClick, setMainBtnClick] = useState({
    auto: false,
    max: false,
    spin: false,
  });

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectEgm);
  const { buttonList, ip } = data || {};

  const subBtnRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    if (!showSubBtn) {
      tl.to(subBtnRef.current, { y: -40, duration: 0.3, ease: 'ease.in' }).to(
        subBtnRef.current,
        { y: '70%', duration: 1, ease: 'bounce.out' },
      );
      return;
    }

    if (showSubBtn) {
      tl.to(subBtnRef.current, { y: -40, duration: 0.3, ease: 'ease.out' }).to(
        subBtnRef.current,
        { y: 0, duration: 1, ease: 'bounce.out' },
      );
    }
  }, [showSubBtn]);

  const manBtnClickHandler = ({ target }) => {
    const { id } = target;

    if (id === 'auto') {
      setIsAuto((prev) => !prev);
    }

    // 啟動main button 動畫邏輯
    // 如果點擊的按鈕已經是true就return
    if (mainBtnClick[id]) return;

    // 設定點擊的按鈕為true
    setMainBtnClick((prev) => ({
      ...prev,
      [id]: true,
    }));

    // 200ms後重新設定為false (動畫結束時間為100ms)
    setTimeout(() => {
      setMainBtnClick((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 200);
  };

  const subBtnClickHandler = ({ name, code }) => {
    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 1000);
  };

  return (
    <section className={styles.container}>
      {/* Menu */}
      <div style={{ paddingLeft: '1rem', paddingTop: '5px' }}>
        <Menu visible={showMenu} setVisible={setShowMenu} />
      </div>

      {/* Video */}
      <div className={styles['video-box']}>
        <Video rtcUrl="webrtc://220.135.67.240/game/11" />
      </div>

      {/* Main Button */}
      <div className={styles['main-btn-box']}>
        <MainBtn
          onClickHandler={manBtnClickHandler}
          mainBtnClick={mainBtnClick}
          isAuto={isAuto}
        />
      </div>

      {/* Sub Button */}
      <div ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubBtn
          showSubBtn={showSubBtn}
          setShowSubBtn={setShowSubBtn}
          buttonList={buttonList || []}
          currentSubBtn={currentSubBtn}
          subBtnClickHandler={subBtnClickHandler}
        />
      </div>
    </section>
  );
};

export default Aristocrat;
