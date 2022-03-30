import React, { useState, useRef } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import { Popup, Result, DotLoading } from 'antd-mobile';

// Components
import Video from '../Video';

// Hooks
import useRwd from '../../hooks/useRwd';

import { setCurrentMenu } from '../../store/actions/menuActions';

// eslint-disable-next-line
// const url = 'webrtc://192.168.10.119/game/71';

const resultStyles = {
  position: 'absolute',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

// eslint-disable-next-line
const Jackpot = ({ visible }) => {
  const { isMobile } = useRwd();

  // Init State
  const [jpPlayStatus, setJpPlayStatus] = useState('loading');

  // Ref
  const sdkRef = useRef();

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectEgm);
  const { stream_url: url } = data || {};

  const getSdkRef = (ref) => {
    sdkRef.current = ref;
  };

  return (
    <Popup
      visible={visible}
      position={isMobile ? 'bottom' : 'left'}
      destroyOnClose
      maskStyle={{ backgroundColor: 'transparent' }}
      onMaskClick={() => {
        dispatch(setCurrentMenu(''));
      }}
      afterClose={() => {
        sdkRef.current.close();
      }}
      bodyStyle={{
        height: isMobile ? '42vh' : '40vh',
        width: isMobile ? '100vw' : '35vw',
      }}
    >
      {jpPlayStatus === 'loading' && (
        <Result
          status="waiting"
          title="彩金視訊加載中"
          description={<DotLoading color="primary" />}
          style={resultStyles}
        />
      )}

      {jpPlayStatus === 'error' && (
        <Result status="error" title="無法獲取彩金視訊" style={resultStyles} />
      )}

      <Video
        rtcUrl={url}
        setPlayStatus={setJpPlayStatus}
        getSdkRef={getSdkRef}
      />
    </Popup>
  );
};

export default Jackpot;
