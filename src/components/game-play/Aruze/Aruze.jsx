import React, { useRef, useState } from 'react';

// Prop-Type
import PropTypes from 'prop-types';

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
  { id: 1, button_name: 'bet-1' },
  { id: 2, button_name: 'bet-3' },
  { id: 3, button_name: 'bet-5' },
  { id: 4, button_name: 'bet-7' },
  { id: 5, button_name: 'bet-9' },
  { id: 6, button_name: 'bet-25' },
  { id: 7, button_name: 'bet-40' },
  { id: 8, button_name: 'bet-50' },
  { id: 9, button_name: 'bet-75' },
  { id: 10, button_name: 'bet-80' },
];

const Aruze = ({
  image,
  // model,
  // buttonList,
  getSdkRef,
  url,
  // ip,
  setPlayStatus,
  playStatus,
  setIsCashInOutClick,
  setShowMenu,
  showMenu,
  exitGameHandler,
}) => {
  console.log('Aruze');

  // Init State
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [playVideo, setPlayVideo] = useState(false);

  // Ref
  const subBtnRef = useRef();

  const subBtnClickHandler = ({ name, code, spinEffect }) => {
    console.log(code, spinEffect);

    if (currentSubBtn) return;
    setCurrentSubBtn(name);

    setTimeout(() => {
      setCurrentSubBtn('');
    }, 800);
  };

  const subBtnEl = buttonList.map((btn) => {
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
          transform: currentSubBtn === name && 'translateY(-10px) scale(1.15)',
        }}
      />
    );
  });

  console.log(playStatus);

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
        <MainBtn />
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
  url: PropTypes.string.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  // buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  // ip: PropTypes.string.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  playStatus: PropTypes.string.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default Aruze;
