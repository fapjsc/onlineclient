import React from 'react';

import { useLocation, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

// Hooks
import useWindowSize from '../../hooks/useWindowSize';

const Layout = () => {
  const [height, width] = useWindowSize();

  const { pathname } = useLocation();

  if (pathname?.includes('game-play')) {
    return (
      <div
        style={{
          height,
          width,
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className={styles['big-bg']}>
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height,
        width,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className={styles['big-bg']}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
