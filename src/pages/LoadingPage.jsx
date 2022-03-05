import React from 'react';

import { Mask, SpinLoading, Space } from 'antd-mobile';

const LoadingPage = () => (
  <Mask visible opacity="default" style={{}}>
    <div
      style={{
        color: '#f5f5f5',
        position: 'absolute',
        top: '50%',
        right: '50%',
        width: '20rem',
        height: '10rem',
        transform: 'translateX(50%) translateY(-70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
      }}
    >
      <Space>
        <SpinLoading color="currentColor" />
        <span>請稍候</span>
      </Space>
    </div>
  </Mask>
);
export default LoadingPage;
