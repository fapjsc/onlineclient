import React from 'react';

// Uuid
// import { v4 as uuidv4 } from 'uuid';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Prop Types
import PropTypes from 'prop-types';

// Antd
import { Popup } from 'antd-mobile';

// Actions
import { setCurrentMenu } from '../../../store/actions/menuActions';

// Hooks
import useRwd from '../../../hooks/useRwd';

// Styles
import styles from './GameDescription.module.scss';

// Description text
// import gameText from './text';

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
    <div style={{ fontSize: '.8rem' }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '1rem',
      }}
      >
        <span>免費遊戲</span>
        <span>
          當畫面出現3個以上「金幣」圖案時，可贏取免費遊戲次數，
          選擇的次數越多，得分隨機乘上的倍數越小(請參閱免費遊戲說明) ，
          免費遊戲結束於所獲得的次數使用完畢，免費遊戲得分倍率同主遊戲之得分倍率表。
        </span>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '1rem',
      }}
      >
        <span>免費遊戲說明</span>
        <span style={{ marginBottom: '0.8rem' }}>
          當無押30分加倍鍵出現三個「金幣」圖案，可得免費遊戲，選擇不同顏色錦鯉會有不同倍率及遊戲次數，分別如下:
        </span>
        <span>1.白錦鯉可得遊戲次數20次-獎金乘以2、3或5倍</span>
        <span>2.紅錦鯉可得遊戲次數15次-獎金乘以3、5或8倍</span>
        <span>3.黑錦鯉可得遊戲次數10次-獎金乘以5、8或10倍</span>
        <span>4.藍錦鯉可得遊戲次數8次-獎金乘以8、10或15倍</span>
        <span>5.黃錦鯉可得遊戲次數5次-獎金乘以10、15或30倍</span>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '1rem',
      }}
      >
        <span style={{ marginBottom: '0.8rem' }}>
          當押30分加倍鍵出現三個「金幣」圖案，可得免費遊戲，選擇不同顏色錦鯉會有不同倍率及遊戲次數，分別如下:
        </span>
        <span>1.白錦鯉可得遊戲次數25次-獎金乘以2、3或5倍</span>
        <span>2.紅錦鯉可得遊戲次數20次-獎金乘以3、5或8倍</span>
        <span>3.黑錦鯉可得遊戲次數15次-獎金乘以5、8或10倍</span>
        <span>4.藍錦鯉可得遊戲次數13次-獎金乘以8、10或15倍</span>
        <span>5.黃錦鯉可得遊戲次數10次-獎金乘以10、15或30倍</span>
      </div>
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
