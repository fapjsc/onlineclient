import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import {
  Button, Avatar, List, Space,
} from 'antd-mobile';

// Actions
import { logout } from '../../store/actions/userActions';

// Hooks
import useRwd from '../../hooks/useRwd';

import styles from './User.module.scss';

const User = () => {
  const { isMobile } = useRwd();

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const { online, member_account: account, mail_address: email } = data || {};

  if (!data) {
    return (
      <section
        className={styles.container}
        style={{
          color: '#d9d9d9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>尚未登入</h1>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Button color="danger" onClick={() => dispatch(logout())}>
            儲值
          </Button>
          <Avatar
            src="https://picsum.photos/200"
            style={{
              '--size': isMobile ? '5rem' : '8rem',
            }}
          />
          <Button onClick={() => dispatch(logout())}>登出</Button>
        </div>
      </div>
      <div className={styles.content}>
        <List header="會員資料">
          <List.Item>
            <Space>
              <span>ID:</span>
              <span>{online.id}</span>
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <span>LEVEL:</span>
              <span>{online.level}</span>
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <span>帳號:</span>
              <span>{account}</span>
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <span>EMAIL:</span>
              <span>{email}</span>
            </Space>
          </List.Item>
          <List.Item>
            <Space>
              <span>點數:</span>
              <span>{online.point}</span>
            </Space>
          </List.Item>
        </List>
      </div>
    </section>
  );
};

export default User;
