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

// Styles
import styles from './User.module.scss';

const User = () => {
  const { isMobile } = useRwd();

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const { online, member_account: account, mail_address: email } = data || {};

  const contentArr = [
    { content: online?.id, text: 'ID' },
    { content: online?.level, text: 'Level' },
    { content: account, text: '帳號' },
    { content: email, text: 'Email' },
    { content: online?.point, text: '點數' },
  ];

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
      <header className={styles.header}>
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
      </header>
      <div className={styles.content}>
        <List header="會員資料" className={styles.list}>
          {contentArr.map((el) => (
            <List.Item className={styles['list-item']}>
              <Space>
                <span>{`${el.text} :`}</span>
                <span>{el.content}</span>
              </Space>
            </List.Item>
          ))}
        </List>
      </div>
    </section>
  );
};

export default User;
