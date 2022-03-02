import React, { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Prop types
import PropTypes from 'prop-types';

// Antd
import {
  Form, Input, Button, TabBar, Modal, Space, Toast,
} from 'antd-mobile';

// Icon
import { PhonebookOutline, AppstoreOutline } from 'antd-mobile-icons';

// actions
import { setupUser } from '../store/actions/userActions';

const LoginForm = ({ visible, setVisible }) => {
  const [activeKey, setActiveKey] = useState('phone');

  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(setupUser({ currentUser: values, endPoint: 'login' }));
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
    if (error) {
      Toast.show({
        content: error,
        icon: 'fail',
        afterClose: () => {
          console.log('after');
        },
      });
    }
  }, [error]);

  return (
    <Modal
      visible={visible}
      closeOnMaskClick
      onClose={() => {
        setVisible(false);
      }}
      content={
        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={() => console.log('test')}
          hasFeedback
          footer={
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                loading={isLoading}
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
            <Input placeholder="請輸入" />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            clearable
            rules={[{ required: true, message: '此項為必填' }]}
          >
            <Input placeholder="請輸入" type="password" />
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

export default LoginForm;
