import React, { useRef, useEffect, useCallback } from 'react';

import { Dialog } from 'antd-mobile';

import PropTypes from 'prop-types';
import { SrsRtcPlayerAsync } from '../utils/srs-sdk';

let flag = true;

const Video = ({
  rtcUrl: url, close, play, setPlayStatus, getSdkRef,
}) => {
  const videoRef = useRef();
  const sdkRef = useRef();

  const startPlay = useCallback(() => {
    if (!flag) return;
    flag = false;
    if (!url) return;

    if (sdkRef.current) {
      sdkRef.current.close();
    }

    sdkRef.current = SrsRtcPlayerAsync();

    sdkRef.current
      .play(url)
      // eslint-disable-next-line
      .then((session) => {
        if (videoRef.current) videoRef.current.srcObject = sdkRef.current.stream;
      })
      .catch(() => {
        sdkRef.current.close();
        Dialog.alert({
          content: '無法獲取影像',
          closeOnMaskClick: true,
          confirmText: '確定',
        });
      })
      .finally(() => {
        flag = true;
      });
  }, [url]);

  useEffect(() => {
    startPlay();
    videoRef.current.muted = false;

    if (getSdkRef) {
      getSdkRef(sdkRef.current);
    }

    // eslint-disable-next-line
  }, [startPlay]);

  useEffect(() => {
    if (close) {
      sdkRef.current.close();
    }
  }, [close]);

  useEffect(() => {
    if (play) {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  }, [play]);

  // Video tag 監聽器
  useEffect(() => {
    if (!setPlayStatus) return;

    const { current } = videoRef || {};

    if (!current) return;

    const loadstart = () => {
      setPlayStatus('loading');
      // console.log('視訊開始下载');
    };

    const canPlay = () => {
      setPlayStatus('canPlay');
      // console.log('準備好播放了');
    };

    const Play = () => {
      setPlayStatus('isPlaying');
      // console.log('正在播放');
    };

    const waiting = () => {
      setPlayStatus('wait');
      // console.log('視訊加載等待');
    };

    const error = () => {
      setPlayStatus('error');
      // console.log('視訊出错了');
    };

    const stalled = () => {
      setPlayStatus('stalled');
      // console.log('瀏覽器嘗試獲取媒體數據，但數據不可用');
    };

    const canplaythrough = () => {
      console.log('視頻能夠不停頓地一直播放');
    };

    const loadeddata = () => {
      console.log('當前幀的數據是可用的');
    };

    current.addEventListener('loadstart', loadstart);
    current.addEventListener('canplay', canPlay);
    current.addEventListener('play', Play);
    current.addEventListener('waiting', waiting);
    current.addEventListener('error', error);
    current.addEventListener('stalled', stalled);
    current.addEventListener('canplaythrough', canplaythrough);
    current.addEventListener('loadeddata', loadeddata);

    return () => {
      current.removeEventListener('loadstart', loadstart);
      current.removeEventListener('canplay', canPlay);
      current.removeEventListener('play', Play);
      current.removeEventListener('waiting', waiting);
      current.removeEventListener('error', error);
      current.removeEventListener('stalled', stalled);
      current.removeEventListener('canplaythrough', canplaythrough);
      current.removeEventListener('loadeddata', loadeddata);
    };
  }, [play, setPlayStatus]);

  return (
    <video
      ref={videoRef}
      id="video-webrtc"
      poster="../assets/bg.webp"
      // controls
      muted
      autoPlay="autoplay"
      playsInline
      style={{
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        backgroundColor: '#1f1f1f',
      }}
    />
  );
};

Video.propTypes = {
  rtcUrl: PropTypes.string.isRequired,
  setPlayStatus: PropTypes.func.isRequired,
  close: PropTypes.bool,
  play: PropTypes.bool,
  getSdkRef: PropTypes.func,
};

Video.defaultProps = {
  close: false,
  play: false,
  getSdkRef: null,
};

export default Video;
