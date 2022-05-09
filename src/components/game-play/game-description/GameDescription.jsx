import React from 'react';

// Uuid
import { v4 as uuidv4 } from 'uuid';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Prop Types
import PropTypes from 'prop-types';

// Antd
import { Popup, List } from 'antd-mobile';

// Actions
import { setCurrentMenu } from '../../../store/actions/menuActions';

// Hooks
import useRwd from '../../../hooks/useRwd';

// Styles
import styles from './GameDescription.module.scss';

// Description text
import gameText from './text';

// Helpers
import { getGameDescriptionImg } from '../../../utils/helper';

// Image
import closeBtnImg from '../../../assets/close-btn.webp';

const GameDescription = ({ visible }) => {
  // Hooks
  const { isTablet } = useRwd();

  // Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.selectEgm);
  const { name, model, brand_name: brand } = data || {};

  const gameDescriptionImg = getGameDescriptionImg({ model, brand });

  // Game description text
  const descriptionText = (
    <div style={{ fontSize: '1rem' }}>
      <List className={styles['description-list']} header="">
        {gameText[model].map((el) => (
          <List.Item
            key={uuidv4()}
            prefix="●"
            className={styles['description-item']}
          >
            {el}
          </List.Item>
        ))}
      </List>
    </div>
  );

  return (
    <Popup
      visible={visible}
      position={isTablet ? 'bottom' : 'left'}
      maskStyle={{ display: 'none' }}
      bodyStyle={{ height: '100%', width: isTablet ? '100%' : '40%' }}
    >
      <section className={styles.container}>
        <header className={styles.header}>
          <span>{name}</span>
          <img
            role="presentation"
            className={styles['close-btn']}
            src={closeBtnImg}
            alt="close-btn"
            onClick={() => {
              dispatch(setCurrentMenu(''));
            }}
          />
        </header>
        <div className={styles.body}>
          <img
            className={styles['description-pic']}
            src={gameDescriptionImg}
            alt="description img"
            data-img={model}
            data-brand={brand}
          />
        </div>
        <footer className={styles.footer}>{descriptionText}</footer>
      </section>
    </Popup>
  );
};

GameDescription.propTypes = {
  visible: PropTypes.bool,
};

GameDescription.defaultProps = {
  visible: false,
};

export default GameDescription;
