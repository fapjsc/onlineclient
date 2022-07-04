import React, { useState, useRef, useEffect } from 'react';

import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';

import { Input } from 'react-chat-elements';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import 'react-chat-elements/dist/main.css';

// Antd
import { Popup, Result, DotLoading } from 'antd-mobile';

// Icons
import { CloseCircleOutline, MessageOutline } from 'antd-mobile-icons';

// Hooks
import useRwd from '../../hooks/useRwd';
import useWindowSize from '../../hooks/useWindowSize';

// Actions
import { setCurrentMenu } from '../../store/actions/menuActions';

// Components
// eslint-disable-next-line
import Video from '../Video';

// Styles
import styles from './ShowLive.module.scss';

// Images
import sendImg from '../../assets/chat/send_icon.png';

// Socket
import { sendMessage } from '../../utils/socket';

// Utils
import { scrollToBottom } from '../../utils/scrollToBottom';

// eslint-disable-next-line
const testUrl = 'webrtc://220.135.67.240/stream/test123';

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
  zIndex: 2,
};

const ShowLive = ({ visible }) => {
  // Init State
  // eslint-disable-next-line
  const [showLiveStatus, setShowLiveStatus] = useState('loading');
  const [showChat, setShowChat] = useState(true);

  // Ref
  const sdkRef = useRef();
  const inputRef = useRef();

  // Hooks
  const { isMobile } = useRwd();
  const [height] = useWindowSize();

  // Redux
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const { messages } = useSelector((state) => state.chat);

  // eslint-disable-next-line
  const getSdkRef = (ref) => {
    sdkRef.current = ref;
  };

  const sendMessageHandler = () => {
    if (!inputRef.current.value) {
      return;
    }

    sendMessage(inputRef.current.value);

    inputRef.current.value = '';
  };

  useEffect(() => {
    if (visible) {
      scrollToBottom('message-container');
    }

    if (!visible) {
      sdkRef.current?.close();
    }

    // eslint-disable-next-line
  }, [visible]);

  return (
    <>
      <section
        type={isMobile ? 'mobile' : 'desktop'}
        className={styles['chat-container']}
        style={{
          height: isMobile ? '100vh' : '30rem',
          transform: visible && showChat && 'translateX(0%)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div id="message-container" className={styles['message-container']}>
            {messages.map((el) => (
              <div key={uuid()} className={styles['chat-item']}>
                {el}
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Input
              referance={inputRef}
              placeholder="輸入訊息..."
              multiline={false}
              inputStyle={{
                paddingLeft: '5px',
                width: '1rem',
              }}
              rightButtons={
                <img
                  role="presentation"
                  onClick={sendMessageHandler}
                  style={{ width: '1.2rem', cursor: 'pointer' }}
                  src={sendImg}
                  alt="send"
                />
              }
            />
          </div>
        </div>
      </section>
      ;
      <Popup
        visible={visible}
        position={isMobile ? 'bottom' : 'left'}
        destroyOnClose
        maskStyle={{ display: 'none' }}
        onMaskClick={false}
        style={{ position: 'relative' }}
        afterClose={() => {}}
        bodyStyle={{
          height: isMobile ? height / 3.25 : '40vh',
          width: isMobile ? '100vw' : '35vw',
        }}
      >
        {showLiveStatus === 'loading' && (
          <Result
            status="waiting"
            title="視訊加載中"
            description={<DotLoading color="primary" />}
            style={resultStyles}
          />
        )}

        {showLiveStatus === 'error' && (
          <Result status="error" title="無法獲取視訊" style={resultStyles} />
        )}

        <div className={styles['icon-box']}>
          <CloseCircleOutline
            onClick={() => dispatch(setCurrentMenu(''))}
            className={`${styles.icon} ${styles['close-icon']}`}
          />

          <MessageOutline
            role="presentation"
            onClick={() => setShowChat((prev) => !prev)}
            className={`${styles['send-message-icon']} ${styles.icon}`}
          />

          <Video
            rtcUrl={testUrl}
            setPlayStatus={setShowLiveStatus}
            getSdkRef={getSdkRef}
          />
        </div>
      </Popup>
    </>
  );
};

ShowLive.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default ShowLive;
