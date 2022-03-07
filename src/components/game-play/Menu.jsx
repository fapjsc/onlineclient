import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import {
  Popup, Form, Input, Button,
} from 'antd-mobile';
import { AppOutline } from 'antd-mobile-icons';

// Actions
import {
  clearSelectEgmData,
  cashInOut,
  clearButtonPressStatus,
  clearCashInOutStatus,
} from '../../store/actions/egmActions';

const Menu = ({ visible, setVisible }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { data: userData } = useSelector((state) => state.user);

  const { online } = userData || {};
  const { online_id: onlineId, point } = online || {};

  const { data: selectEgmData } = useSelector((state) => state.selectEgm);

  const { ip } = selectEgmData || {};

  const cashInRef = useRef();
  const cashOutRef = useRef();

  const onFinish = (values) => {
    let data = { onlineId, ip };

    Object.entries(values).forEach(([key, value]) => {
      data = {
        ...data,
        type: key,
        cashAmount: value,
      };
    });

    console.log(data);
    dispatch(cashInOut(data));

    cashOutRef.current?.resetFields();
    cashInRef.current?.resetFields();
  };

  const exitGameHandler = () => {
    dispatch(clearButtonPressStatus());
    dispatch(clearCashInOutStatus());
    dispatch(clearSelectEgmData());
  };

  useEffect(() => {
    if (!ip) {
      navigate('/');
    }
  }, [ip, navigate]);
  return (
    <>
      <AppOutline
        onClick={() => {
          setVisible(true);
        }}
        style={{
          color: '#fff',

          fontSize: '2rem',
          cursor: 'pointer',
        }}
      />
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        position="right"
        bodyStyle={{ minWidth: '40vw' }}
      >
        <div style={{ padding: '1rem', width: '100%' }}>
          <Form
            ref={cashInRef}
            onFinish={onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                確定
              </Button>
            }
          >
            <Form.Header>{point}</Form.Header>
            <Form.Item name="aft-in" label="開分" rules={[{ required: true }]}>
              <Input placeholder="請輸入" />
            </Form.Item>
          </Form>
        </div>

        <div style={{ padding: '1rem', width: '100%' }}>
          <Form
            ref={cashOutRef}
            onFinish={onFinish}
            footer={
              <Button block type="submit" color="primary" size="large">
                確定
              </Button>
            }
          >
            <Form.Item name="aft-out" label="洗分" rules={[{ required: true }]}>
              <Input placeholder="請輸入" />
            </Form.Item>
          </Form>
        </div>

        <div style={{ padding: '1rem' }}>
          <Button color="danger" size="large" onClick={exitGameHandler}>
            離開
          </Button>
        </div>
      </Popup>
    </>
  );
};

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Menu;
