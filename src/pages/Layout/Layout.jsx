import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Layout.module.scss';

// Hooks
import useWindowSize from '../../hooks/useWindowSize';

// eslint-disable-next-line
const Layout = ({ children }) => {
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
        <div className={styles['big-bg']}>{children}</div>
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
        <div className={styles.container}>{children}</div>
      </div>
      {/* {children} */}
      {/* {<div className={styles.container}>{children}</div>} */}
    </div>
  );
};

export default Layout;
