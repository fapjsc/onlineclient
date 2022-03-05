import React, { useRef, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Components
import Menu from '../Menu';
import Video from '../../Video';
import MainBtn from './MainBtn';
import SubBtn from './SubBtn';
import CashInOutBtn from './CashInOutBtn';

// Actions
import { buttonPress } from '../../../store/actions/egmActions';

// Hooks
import useBounceOut from '../../../hooks/useBounceOut';

// Styles
import styles from './Aristocrat.module.scss';
import '../../../sass/animation.scss';

const Aristocrat = () => {
  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isCashInOutClick, setIsCashInOutClick] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectEgm);
  const { buttonList, ip } = data || {};

  // Ref
  const subBtnRef = useRef();

  useBounceOut({
    isSHowElement: showSubBtn,
    elementRef: subBtnRef,
    showEl: {
      from: -40,
      to: 0,
      fromDuration: 0.3,
      toDuration: 1,
    },
    hideEl: {
      from: -40,
      to: '70%',
      fromDuration: 0.3,
      toDuration: 1,
    },
  });

  const subBtnClickHandler = ({ name, code }) => {
    setCurrentSubBtn(name);
    dispatch(buttonPress({ name, code, ip }));

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 800);
  };

  return (
    <article className={styles.container}>
      {/* Menu */}
      <section style={{ paddingLeft: '1rem', paddingTop: '5px' }}>
        <Menu visible={showMenu} setVisible={setShowMenu} />
      </section>

      {/* Video */}
      <section className={styles['video-box']}>
        <Video rtcUrl="webrtc://220.135.67.240/game/12" />
      </section>

      {/* CashInOut Button */}
      <CashInOutBtn
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
      />

      {/* Main Button */}
      <section className={styles['main-btn-box']}>
        <MainBtn />
      </section>

      {/* Sub Button */}
      <section ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubBtn
          subBtnRef={subBtnRef}
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

export default Aristocrat;
