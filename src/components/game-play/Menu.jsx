import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Popup } from 'antd-mobile';
import {
  AppstoreOutline,
  CloseOutline,
  StarOutline,
  TeamOutline,
  BankcardOutline,
  BellOutline,
  HeartOutline,
  TravelOutline,
} from 'antd-mobile-icons';

// Hooks
import useRwd from '../../hooks/useRwd';
import useWindowSize from '../../hooks/useWindowSize';

// Actions
import { setCurrentMenu } from '../../store/actions/menuActions';

// Styles
import styles from './Menu.module.scss';

const menuLis = [
  { id: 'jp', icon: <StarOutline />, name: 'JP彩金' },
  { id: 'cs', icon: <BellOutline />, name: '線上客服' },
  { id: 'wallet', icon: <BankcardOutline />, name: '我的錢包' },
  { id: 'friends', icon: <TeamOutline />, name: '好友' },
  { id: 'online', icon: <HeartOutline />, name: '直播' },
  { id: 'leave', icon: <TravelOutline />, name: '返回大廳' },
];

// eslint-disable-next-line
const Menu = ({ visible, setVisible, exitGameHandler, size }) => {
  const { isMobile } = useRwd();
  const [height, width] = useWindowSize();

  // Redux
  const dispatch = useDispatch();

  const onClickHandler = (id) => {
    if (!id) return;

    if (id === 'leave') {
      exitGameHandler();
    } else {
      dispatch(setCurrentMenu(id));
    }

    setVisible(false);
  };

  return (
    <>
      <AppstoreOutline
        onClick={() => {
          setVisible(true);
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
          setVisible(false);
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
};

Menu.defaultProps = {
  size: '1.4rem',
};

export default Menu;
