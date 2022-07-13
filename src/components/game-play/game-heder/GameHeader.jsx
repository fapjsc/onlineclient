import React, { useState } from 'react';

import PropTypes from 'prop-types';

// Components
import HeaderWrapper from './HeaderWrapper';
import Menu from '../Menu';

// Styles
import styles from './GameHeader.module.scss';

const GameHeader = ({
  exitGameHandler, point, egmName, egmID, userLevel, userName,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <HeaderWrapper className={styles.header}>
      <section className={styles['header-left-box']}>
        <div
          className={styles['egm-info']}
        >
          <span className={styles['game-name']}>{egmName}</span>
          <span className={styles['game-number']}>
            NO.
            {egmID}
          </span>
        </div>
        <div
          className={styles['play-info']}
        >
          <span className={styles['user-level']}>{userLevel?.toUpperCase()}</span>
          <span className={styles['user-name']}>{userName}</span>
        </div>

      </section>
      <section className={styles['header-right-box']}>
        <div className={styles['header-total']}>
          <span>代幣</span>
          <span>{point}</span>
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

GameHeader.propTypes = {
  exitGameHandler: PropTypes.func.isRequired,
  point: PropTypes.number,
  egmName: PropTypes.string.isRequired,
  egmID: PropTypes.number.isRequired,
  userLevel: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

GameHeader.defaultProps = {
  point: 0,
};

export default GameHeader;
