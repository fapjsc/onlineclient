import React, { useState, useEffect, useRef } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

import crypto from 'crypto';

// Antd
import {
  Form, Input, Button, TabBar, Modal, Space, Dialog,
} from 'antd-mobile';

// Icon
import { PhonebookOutline, AppstoreOutline } from 'antd-mobile-icons';

import { rootActionTypes } from '../store/types';

// actions
import { setupUser, getCrypto } from '../store/actions/userActions';

const LoginForm = ({ visible, setVisible }) => {
  const formRef = useRef();
  const [activeKey, setActiveKey] = useState('phone');

  const { isLoading: userLoading, error: userError } = useSelector(
    (state) => state.user,
  );
  const {
    data: cryptoKey,
    isLoading: cryptoLoading,
    error: cryptoError,
  } = useSelector((state) => state.crypto);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(getCrypto());
  };

  const tabs = [
    {
      key: 'phone',
      title: '手機登入',
      icon: <PhonebookOutline />,
    },
    {
      key: 'account',
      title: '帳號登入',
      icon: <AppstoreOutline />,
    },
  ];

  const toolBar = (
    <TabBar activeKey={activeKey} onChange={setActiveKey}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );

  useEffect(() => {
    if (cryptoError && userError) {
      Dialog.alert({
        content: '登入錯誤，請稍後再試',
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch({ type: rootActionTypes.RESET_STORE });
        },
      });
    }

    if (cryptoError && !userError) {
      Dialog.alert({
        content: cryptoError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch({ type: rootActionTypes.RESET_STORE });
        },
      });
    }

    if (!cryptoError && userError) {
      Dialog.alert({
        content: userError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch({ type: rootActionTypes.RESET_STORE });
        },
      });
    }
  }, [userError, cryptoError, dispatch]);

  useEffect(() => {
    if (!cryptoKey) return;

    let formValue = formRef.current.getFieldValue();

    const password = crypto.publicEncrypt(
      cryptoKey,
      Buffer.from(formValue.password),
    );

    formValue = {
      password: password,
      [activeKey]: formValue[activeKey],
    };

    dispatch(setupUser({ currentUser: formValue, endPoint: 'login' }));
  }, [cryptoKey, dispatch, activeKey]);

  console.log('login form');

  return (
    <Modal
      visible={visible}
      closeOnMaskClick
      onClose={() => {
        setVisible(false);
      }}
      content={
        <Form
          ref={formRef}
          layout="horizontal"
          onFinish={onFinish}
          hasFeedback
          footer={
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                loading={userLoading || cryptoLoading}
                loadingText="請稍等"
                type="submit"
                block
                color="primary"
                size="large"
              >
                確定
              </Button>
              <Button block size="large" onClick={() => setVisible(false)}>
                取消
              </Button>
            </Space>
          }
        >
          <Form.Header>{toolBar}</Form.Header>

          <Form.Item
            label={activeKey === 'account' ? '帳號' : '手機'}
            name={activeKey}
            clearable
            rules={[{ required: true, message: '此項為必填' }]}
          >
            <Input placeholder="請輸入" autoComplete="off" />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            clearable
            rules={[{ required: true, message: '此項為必填' }]}
          >
            <Input
              placeholder="請輸入"
              autoComplete="current-password"
              type="password"
            />
          </Form.Item>
        </Form>
      }
    />
  );
};

LoginForm.propTypes = {
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default React.memo(LoginForm);
