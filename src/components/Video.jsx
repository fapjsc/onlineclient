import React, { useRef, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import { SrsRtcPlayerAsync } from '../utils/srs-sdk';

const Video = ({ rtcUrl: url }) => {
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
      });
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    startPlay();
    cameraRef.current.muted = false;
  }, [startPlay]);

  return (
    <video
      ref={cameraRef}
      id="video-webrtc"
      muted
      autoPlay
      controls
      playsInline
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
      }}
    />
  );
};

Video.propTypes = {
  rtcUrl: PropTypes.string.isRequired,
};

export default Video;
