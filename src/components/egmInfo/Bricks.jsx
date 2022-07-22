import React from 'react';
import styles from './Bricks.module.scss';

const Bricks = () => (
  <div className={styles.container}>
    {
      new Array(30).fill('').map(() => (
        <div className={styles['container-noneBg']} />
      ))
    }
    {
      new Array(30).fill('').map(() => (
        <div className={styles['container-redBg']} />
      ))
    }
    {
      new Array(50).fill('').map(() => (
        <div className={styles['container-greenBg']} />
      ))
    }
    {
      new Array(11).fill('').map((item, index) => (
        index !== 0
          ? <div className={styles['container-currentBg']}>{index + 1}</div>
          : <div className={styles['container-text']}>CURRENT</div>
      ))
    }
    {
      new Array(11).fill('').map((item, index) => (
        index !== 0
          ? <div className={styles['container-startBg']} />
          : <div className={styles['container-text']}>START</div>

      ))
    }
    {
      new Array(11).fill('').map((item, index) => (
        index !== 0
          ? <div className={styles['container-seaBlueBg']} />
          : <div className={styles['container-text']}>BONUS</div>

      ))
    }
  </div>
);
export default Bricks;
