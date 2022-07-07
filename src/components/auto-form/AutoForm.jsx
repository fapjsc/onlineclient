import React from 'react';
// Antd
import { Mask } from 'antd-mobile';

// Prop-Type
import PropTypes from 'prop-types';

// Hooks
import useWindowSize from '../../hooks/useWindowSize';

// Styles
import styles from './AutoForm.module.scss';

// Images
import closeBtnImg from '../../assets/close-btn.webp';

const AutoForm = ({ visible, setVisible, setIsAuto }) => {
  const [height] = useWindowSize();

  const onAutoClick = (timer) => {
    setIsAuto(() => ({ action: true, limit: timer }));
    setVisible(false);
  };
  return (
    <Mask color="white" visible={visible}>
      <div style={{ height }} className={styles.container}>
        <div className={styles.form}>
          <header className={styles.header}>
            <span>選擇時間</span>
            <img
              role="presentation"
              onClick={() => {
                setVisible(false);
              }}
              src={closeBtnImg}
              alt="close"
            />
          </header>
          <div className={styles.body}>
            <div role="presentation" onClick={() => onAutoClick(1000 * 60 * 10)}>10分鐘</div>
            <div role="presentation" onClick={() => onAutoClick(-1)} className={styles.infin}>&infin;</div>
          </div>
        </div>
      </div>
    </Mask>
  );
};

AutoForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  setIsAuto: PropTypes.func.isRequired,
};

export default AutoForm;
