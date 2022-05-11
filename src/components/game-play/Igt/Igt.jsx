import React, { useRef, useState } from 'react';

// Prop-Type
import PropTypes from 'prop-types';

// components
import Wrapper from '../Wrapper';
import SubHolder from '../SubBtnHolder';
import Menu from '../Menu';
import MainBtn from './MainBtn';
import Video from '../../Video';

// Styles
import styles from './Igt.module.scss';

// eslint-disable-next-line
const Igt = ({
  model,
  image,
  getSdkRef,
  setIsCashInOutClick,
  //   isCashInOutClick,
  url,
  //   buttonList,
  // ip,
  currentBtnPress,
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
  //   setCurrentSubBtn,
}) => {
  const [showSubBtn, setShowSubBtn] = useState(false);
  const subBtnRef = useRef();

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
        <MainBtn />
      </section>

      <section ref={subBtnRef} className={styles['sub-btn-box']}>
        <SubHolder
          subBtnRef={subBtnRef.current}
          showSubBtn={showSubBtn}
          setShowSubBtn={setShowSubBtn}
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
  //   buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  //   ip: PropTypes.string.isRequired,
  currentBtnPress: PropTypes.string,
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  playStatus: PropTypes.string.isRequired,
  playVideo: PropTypes.bool.isRequired,
  setPlayVideo: PropTypes.func.isRequired,
  //   showSubBtn: PropTypes.bool.isRequired,
  //   setShowSubBtn: PropTypes.func.isRequired,
  //   currentSubBtn: PropTypes.string.isRequired,
  //   setCurrentSubBtn: PropTypes.func.isRequired,
};

Igt.defaultProps = {
  currentBtnPress: null,
};

export default Igt;
