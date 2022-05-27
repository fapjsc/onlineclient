import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import { Popup, Toast } from 'antd-mobile';
import {
  AppstoreOutline,
  CloseOutline,
  StarOutline,
  TeamOutline,
  BankcardOutline,
  BellOutline,
  VideoOutline,
  TravelOutline,
  TextOutline,
} from 'antd-mobile-icons';

// Hooks
import useRwd from '../../hooks/useRwd';
import useWindowSize from '../../hooks/useWindowSize';

// Actions
import { setCurrentMenu } from '../../store/actions/menuActions';
import { leaveEgm } from '../../store/actions/egmActions';

// Styles
import styles from './Menu.module.scss';

const menuLis = [
  { id: 'description', icon: <TextOutline />, name: '遊戲說明' },
  { id: 'jp', icon: <StarOutline />, name: '現場攝影機' },
  { id: 'cs', icon: <BellOutline />, name: '線上客服' },
  { id: 'wallet', icon: <BankcardOutline />, name: '我的錢包' },
  { id: 'friends', icon: <TeamOutline />, name: '好友' },
  { id: 'show-live', icon: <VideoOutline />, name: '直播' },
  { id: 'leave', icon: <TravelOutline />, name: '返回大廳' },
];

const Menu = ({
  visible,
  setVisible,
  // eslint-disable-next-line
  exitGameHandler,
  size,
  setIsAuto,
}) => {
  const { isMobile } = useRwd();
  const [height, width] = useWindowSize();

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const { token } = data || {};

  const { data: selectData } = useSelector((state) => state.selectEgm);
  // eslint-disable-next-line
  const { model } = selectData || {};

  const {
    isLoading: leaveEgmLoading,
    data: leaveEgmData,
    error: leaveEgmError,
  } = useSelector((state) => state.leaveEgm);

  const onClickHandler = (id) => {
    if (!id) return;

    if (id !== 'leave') {
      dispatch(setCurrentMenu(id));
      setVisible(false);
      return;
    }

    // if (model === '拳王') {
    //   exitGameHandler();
    //   return;
    // }

    dispatch(leaveEgm({ userToken: token }));
    setVisible(false);
  };

  useEffect(() => {
    if (leaveEgmLoading) {
      Toast.show({
        icon: 'loading',
        content: '請稍候',
      });

      return;
    }

    if (leaveEgmError) {
      Toast.show({
        icon: 'fail',
        content: leaveEgmError,
        duration: 2000,
      });
      // exitGameHandler();
      return;
    }

    if (leaveEgmData?.status === 200) {
      exitGameHandler();
    }
    // eslint-disable-next-line
  }, [leaveEgmLoading, leaveEgmData, leaveEgmError]);

  return (
    <>
      <AppstoreOutline
        onClick={() => {
          if (setIsAuto) setIsAuto(false);
          if (setVisible) setVisible(true);
        }}
        style={{
          color: '#fff',
          fontSize: size,
          cursor: 'pointer',
        }}
      />
      <Popup
        visible={visible}
        position={isMobile ? 'top' : 'right'}
        getContainer={null}
        onMaskClick={() => {
          if (setVisible) setVisible(false);
        }}
        bodyStyle={{
          height: isMobile ? '60vh' : height,
          width: isMobile ? width : '45vw',
        }}
      >
        <section className={styles['content-box']}>
          {menuLis.map((el) => (
            <div key={el.id} className={styles['border-wrap']}>
              <div
                id={el.id}
                role="presentation"
                onClick={() => onClickHandler(el.id)}
                className={styles.item}
              >
                <span>{el.icon}</span>
                <span>{el.name}</span>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.close}>
          <CloseOutline onClick={() => setVisible(false)} />
        </section>
      </Popup>
    </>
  );
};

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
  size: PropTypes.string,
  setIsAuto: PropTypes.func,
};

Menu.defaultProps = {
  size: '1.4rem',
  setIsAuto: null,
};

export default Menu;
