import React, { useState } from 'react';

// Components
import HeaderWrapper from './HeaderWrapper';
import Menu from '../Menu';

// Hooks
// import useExitGame from '../../../hooks/useExitGame';

// Styles
import styles from './GameHeader.module.scss';

// Image
import headerRed from '../../../assets/game-machine/header/red.webp';
// import headerGreen from '../../../assets/game-machine/header/green.webp';
import headerYellow from '../../../assets/game-machine/header/yellow.webp';

// eslint-disable-next-line
const GameHeader = ({ exitGameHandler, point }) => {
  const { coin, win } = point || {};
  const [showMenu, setShowMenu] = useState(false);
  // const { exitGameHandler } = useExitGame();

  // console.log(exitGameHandler);

  return (
    <HeaderWrapper className={styles.header}>
      <section className={styles['header-left-box']}>
        <div
          className={`${styles['header-left-item']} ${styles['header-title']}`}
        >
          <span>拳王</span>
          <span>EGM-001</span>
        </div>
        <div
          className={`${styles['header-left-item']} ${styles['header-red']}`}
        >
          <img src={headerRed} alt="red" />
          <span>{coin}</span>
        </div>
        <div
          className={`${styles['header-left-item']} ${styles['header-yellow']}`}
        >
          <img src={headerYellow} alt="yellow" />
          <span>{win}</span>
        </div>
        {/* <div
          className={`${styles['header-left-item']} ${styles['header-green']}`}
        >
          <img src={headerGreen} alt="green" />
          <span>121234</span>
        </div> */}
      </section>
      <section className={styles['header-right-box']}>
        <div className={styles['header-total']}>
          <span>TOTAL</span>
          {/* <span>987987</span> */}
        </div>
        <div className={styles['header-menu']}>
          <Menu
            size="2.5rem"
            visible={showMenu}
            setVisible={setShowMenu}
            exitGameHandler={exitGameHandler}
          />
        </div>
      </section>
    </HeaderWrapper>
  );
};

export default GameHeader;
