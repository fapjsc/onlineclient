import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import classnames from 'classnames';

import PropTypes from 'prop-types';
import { getUserInfo } from '../../store/actions/userActions';

import styles from './HomeButton.module.scss';

const HomeButton = ({ setCurrentAction }) => {
  const { data } = useSelector((state) => state.user);
  const { token } = data || {};

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [btnClick, setBtnClick] = useState({
    home: false,
    'game-type': false,
    user: false,
  });

  const clickHandler = ({ target }) => {
    const { id } = target || {};
    if (!id) return;

    setBtnClick((prev) => ({
      ...prev,
      [id]: true,
    }));

    if (id === 'home') {
      setCurrentAction('home');
    }

    if (id === 'game-type') {
      // setCurrentAction('game-type');
      navigate('/game-type');
    }

    if (id === 'user') {
      setCurrentAction('user');
      if (token) {
        dispatch(getUserInfo(token));
      }
    }

    setTimeout(() => {
      setBtnClick((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 300);
  };

  return (
    <div className={styles['home-btn-container']}>
      <div className={styles['home-btn-box']}>
        <div className={styles['btn-container']}>
          <div
            id="home"
            role="presentation"
            onClick={clickHandler}
            className={`${styles.home} ${styles['home-btn']} ${classnames({
              [styles['home-btn-animation']]: btnClick.home,
            })}`}
          />
          <div
            id="game-type"
            role="presentation"
            onClick={clickHandler}
            className={`${styles.game} ${styles['home-btn']} ${classnames({
              [styles['home-btn-animation']]: btnClick['game-type'],
            })}`}
          />
          <div
            id="user"
            role="presentation"
            onClick={clickHandler}
            className={`${styles.user} ${styles['home-btn']} ${classnames({
              [styles['home-btn-animation']]: btnClick.user,
            })}`}
          />
        </div>
        <div className={styles['icon-container']} />
      </div>
    </div>
  );
};

HomeButton.propTypes = {
  setCurrentAction: PropTypes.func,
};

HomeButton.defaultProps = {
  setCurrentAction: null,
};

export default HomeButton;
