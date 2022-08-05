import React, { useState, useRef } from 'react';

// Prop type
import PropTypes from 'prop-types';

// Redux
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';

// Antd
import {
  Popup, Result, DotLoading, Image,
} from 'antd-mobile';

// Components
import Video from '../Video';

// Hooks
import useRwd from '../../hooks/useRwd';

// Actions
import { setCurrentMenu } from '../../store/actions/menuActions';

// Images
import closeImag from '../../assets/開洗分介面/btn_close_normal.webp';

// eslint-disable-next-line
const testUrl = process.env.REACT_APP_LIVE_SCENE_URL || 'webrtc://220.135.67.240/game/188';

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

const Jackpot = ({ visible }) => {
  const { isMobile } = useRwd();

  // Init State
  const [jpPlayStatus, setJpPlayStatus] = useState('loading');

  // Ref
  const sdkRef = useRef();

  // Redux
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state.selectEgm);
  // const { stream_url: url } = data || {};

  // eslint-disable-next-line
  const getSdkRef = (ref) => {
    sdkRef.current = ref;
  };

  return (
    <Popup
      visible={visible}
      position={isMobile ? 'bottom' : 'left'}
      destroyOnClose
      maskStyle={{ display: 'none' }}
      onMaskClick={false}
      style={{ position: 'relative' }}
      afterClose={() => {
        setJpPlayStatus('loading');
        sdkRef.current.close();
      }}
      bodyStyle={{
        height: isMobile ? '35vh' : '40vh',
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

      <div
        role="presentation"
        onClick={() => {
          dispatch(setCurrentMenu(''));
        }}
        style={{
          position: 'absolute',
          bottom: isMobile ? '100%' : 0,
          right: 0,
          width: '100%',
          transform: 'translateY(100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-end' : 'center',
          padding: '5px',
          zIndex: 9999999,
        }}
      >
        <Image
          role="presentation"
          src={closeImag}
          width="1.5rem"
          style={{
            cursor: 'pointer',
          }}
        />
      </div>

      <Video
        rtcUrl={testUrl}
        setPlayStatus={setJpPlayStatus}
        getSdkRef={getSdkRef}
      />
    </Popup>
  );
};

Jackpot.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Jackpot;
