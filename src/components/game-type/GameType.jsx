import React from 'react';

import PropTypes from 'prop-types';

// Styles
import styles from './GameType.module.scss';

const GameType = ({ setCurrentAction }) => (
  <div className={styles['content-box']}>
    <div
      role="presentation"
      onClick={() => setCurrentAction('slot-list')}
      className={` ${styles['btn-type']} ${styles.slot}`}
    />
    <div className={` ${styles['btn-type']} ${styles.other}`} />
  </div>
);

GameType.propTypes = {
  setCurrentAction: PropTypes.func.isRequired,
};

export default GameType;
