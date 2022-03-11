import React from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Button, Avatar, Tabs } from 'antd-mobile';
import { FillinOutline, SetOutline } from 'antd-mobile-icons';

// Actions
import { logout } from '../../store/actions/userActions';

// Hooks
import useRwd from '../../hooks/useRwd';

import styles from './User.module.scss';

const User = () => {
  const { isMobile } = useRwd();
  const dispatch = useDispatch();
  console.log('user');
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <FillinOutline />
          <Avatar
            src="https://picsum.photos/200"
            style={{
              '--size': isMobile ? '5rem' : '8rem',
            }}
          />
          <SetOutline />
        </div>
        <div className={styles.text}>
          <p>文字</p>
          <p>文字</p>
          <p>文字</p>
        </div>
      </div>
      <div className={styles.content}>
        <Tabs>
          <Tabs.Tab title="tab1" key="fruits">
            tab1
          </Tabs.Tab>
          <Tabs.Tab title="tab2" key="vegetables">
            tab2
          </Tabs.Tab>
          <Tabs.Tab title="tab3" key="animals">
            tab3
          </Tabs.Tab>
        </Tabs>
        <Button onClick={() => dispatch(logout())}>登出</Button>
      </div>
    </section>
  );
};

export default User;
