import React from 'react';

import { Mask, SpinLoading, Space } from 'antd-mobile';

import styles from './LoadingPage.module.scss';

const LoadingPage = () => (
  <Mask visible>
    <div className={styles.container}>
      <div className={styles.box}>
        <Space>
          <SpinLoading color="currentColor" />
          <span>請稍候...</span>
        </Space>
      </div>
    </div>
  </Mask>
);
export default LoadingPage;
