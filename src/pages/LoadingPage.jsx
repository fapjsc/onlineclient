import React from 'react';

import { SpinLoading, Space } from 'antd-mobile';

import styles from './LoadingPage.module.scss';

const LoadingPage = () => (
  <div className={styles.container}>
    <div className={styles.box}>
      <Space>
        <SpinLoading color="currentColor" />
        <span>請稍候...</span>
      </Space>
    </div>
  </div>
);
export default LoadingPage;
