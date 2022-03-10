import React, { useRef, useEffect, useCallback } from 'react';

import { Dialog } from 'antd-mobile';

import PropTypes from 'prop-types';
import { SrsRtcPlayerAsync } from '../utils/srs-sdk';

const Video = ({
  rtcUrl: url,
  close,
  play,
  videoPlayHandler,
  setShowBtnPlay,
}) => {
  const cameraRef = useRef();
  const sdkRef = useRef();

  const startPlay = useCallback(() => {
    if (sdkRef.current) {
      sdkRef.current.close();
    }

    sdkRef.current = SrsRtcPlayerAsync();

    sdkRef.current
      .play(url)
      // .play('webrtc://220.135.67.240/game/11')
      // eslint-disable-next-line
      .then((session) => {
        if (cameraRef.current) cameraRef.current.srcObject = sdkRef.current.stream;
      })
      .catch((e) => {
        console.log(e, 'error catch');
        sdkRef.current.close();
        Dialog.alert({
          content: '無法獲取影像',
          closeOnMaskClick: true,
          confirmText: '確定',
        });
      });
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    startPlay();
    cameraRef.current.muted = false;
  }, [startPlay]);

  useEffect(() => {
    if (close) {
      sdkRef.current.close();
    }
  }, [close]);

  useEffect(() => {
    if (play) {
      startPlay();
      cameraRef.current.muted = false;
    }
  }, [play, startPlay]);

  useEffect(() => {
    const { current } = cameraRef || {};
    if (!current) return;

    const canPlay = () => {
      videoPlayHandler(current);
    };

    const isPlay = () => {
      setShowBtnPlay(false);
    };
    current.addEventListener('canplay', canPlay);

    current.addEventListener('play', isPlay);

    return () => {
      current.removeEventListener('canplay', canPlay);
      current.removeEventListener('play', isPlay);
    };
  }, [cameraRef, videoPlayHandler, setShowBtnPlay]);

  return (
    <>
      <video
        ref={cameraRef}
        id="video-webrtc"
        muted
        autoPlay="autoplay"
        playsInline
        style={{
          objectFit: 'contain',
          height: '100%',
          width: '100%',
        }}
      />
    </>
  );
};

Video.propTypes = {
  rtcUrl: PropTypes.string.isRequired,
  close: PropTypes.bool,
  play: PropTypes.bool,
  videoPlayHandler: PropTypes.func,
  setShowBtnPlay: PropTypes.func,
};

Video.defaultProps = {
  close: false,
  play: false,
  videoPlayHandler: null,
  setShowBtnPlay: null,
};

export default Video;
