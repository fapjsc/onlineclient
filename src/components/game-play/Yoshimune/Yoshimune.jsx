import React, { useState, useEffect } from 'react';

// Prop-Type
import PropTypes from 'prop-types';

import classnames from 'classnames';

// Components
import Wrapper from '../Wrapper';
import Menu from '../Menu';

import styles from './Yoshimune.module.scss';

const Yoshimune = ({
  image,
  model,
  showMenu,
  setShowMenu,
  exitGameHandler,
}) => {
  const [spin, setSpin] = useState(false);

  const onSpinClick = () => {
    setSpin(true);
  };

  useEffect(() => {
    if (spin) {
      setTimeout(() => {
        setSpin(false);
      }, 400);
    }
  }, [spin]);
  return (
    <Wrapper img={image} className={styles.container} model={model}>
      {/* Menu */}
      <section className={styles['menu-box']}>
        <Menu
          visible={showMenu}
          setVisible={setShowMenu}
          exitGameHandler={exitGameHandler}
        />
      </section>

      <section className={styles['btn-box']}>
        <div className={styles.content}>
          <div
            role="presentation"
            onClick={onSpinClick}
            className={`${styles.spin} ${classnames({
              [styles['spin-move']]: spin,
            })}`}
          />
        </div>
      </section>
    </Wrapper>
  );
};

Yoshimune.propTypes = {
  image: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  exitGameHandler: PropTypes.func.isRequired,
};

export default Yoshimune;
