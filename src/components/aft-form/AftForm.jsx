import React, { useState, useEffect } from 'react';

import NumberFormat from 'react-number-format';

import classnames from 'classnames';

import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Mask, Button } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import useWindowSize from '../../hooks/useWindowSize';

// Actions
import { setAftFormData, clearAftForm } from '../../store/actions/egmActions';

// Styles
import styles from './AftForm.module.scss';

// Components
import aftInImage from '../../assets/開洗分介面/btn_creditin_normal.png';
import aftOutImage from '../../assets/開洗分介面/btn_creditout_normal.png';
import closeImage from '../../assets/開洗分介面/btn_close_normal.png';
import cashChipsImage from '../../assets/開洗分介面/btn_cashchips_normal.jpg';
import cashChipsSelectImage from '../../assets/開洗分介面/btn_cashchips_sel.jpg';
import junkImage from '../../assets/開洗分介面/btn_junketschips_normal.jpg';
import junkSelectImage from '../../assets/開洗分介面/btn_junketschips_sel.jpg';

// Helpers
// import { thousandsFormat } from '../../utils/helper';

const amountArr = [
  '1000',
  '2000',
  '3000',
  '4000',
  '5000',
  '6000',
  '7000',
  '8000',
];

const AftForm = ({
  isCashInOutClick,
  setIsCashInOutClick,
  aftLoading,
  point,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [currentAmount, setCurrentAmount] = useState('');
  const [selectChipType, setSelectChipType] = useState('');
  const [aftType, setAftType] = useState('');

  const [height] = useWindowSize();

  const dispatch = useDispatch();

  const backHandler = () => {
    setShowContent(false);
    setShowNav(false);
    setCurrentAmount('');
    setSelectChipType('');
    setAftType('');
  };

  const closeHandler = () => {
    setIsCashInOutClick(false);
    backHandler();
  };

  const aftTypeSelectHandler = ({ target }) => {
    const { id } = target;
    setAftType(id);
  };

  const onSubmitHandler = () => {
    const data = {
      aftType,
      currentAmount,
      selectChipType,
    };

    dispatch(setAftFormData(data));
  };

  const typeText = () => {
    if (selectChipType === 'cash') {
      return '現金碼';
    }

    if (selectChipType === 'promo') {
      return '泥瑪';
    }

    return '尚未選擇';
  };

  const amountBtnClickHandler = ({ target }) => {
    const { id } = target || {};
    setCurrentAmount(id);
  };

  useEffect(() => {
    if (selectChipType) {
      setShowContent(true);
    }
  }, [selectChipType]);

  useEffect(() => {
    if (aftType) {
      setShowNav(true);
    }
  }, [aftType]);

  return (
    <Mask
      visible={isCashInOutClick}
      color="white"
      opacity="thin"
      afterClose={() => {
        backHandler();
        dispatch(clearAftForm());
      }}
    >
      <div
        style={{
          height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <section className={styles.form}>
          <header className={styles.header}>
            <span
              role="presentation"
              onClick={backHandler}
              style={{ opacity: !showNav && 0 }}
            >
              <LeftOutline />
            </span>

            {showNav && <span>選擇籌碼類型</span>}

            <img
              role="presentation"
              src={closeImage}
              alt="close"
              onClick={closeHandler}
            />
          </header>

          <nav className={styles.nav} role="presentation">
            <div
              className={`${styles['nav-btn-box']} ${styles['select-in-out']}`}
              style={{ left: showNav && '-100%' }}
              // onClick={() => setToggleNav(true)}
              role="presentation"
            >
              <img
                src={aftInImage}
                id="aft-in"
                alt="aft in"
                onClick={aftTypeSelectHandler}
                role="presentation"
              />
              <img
                src={aftOutImage}
                alt="aft out"
                id="aft-out"
                onClick={aftTypeSelectHandler}
                role="presentation"
              />
            </div>

            <div
              className={`${styles['nav-btn-box']} ${styles['type-box']}`}
              style={{ left: showNav && 0 }}
            >
              <img
                src={
                  selectChipType === 'cash'
                    ? cashChipsSelectImage
                    : cashChipsImage
                }
                alt="cash chips"
                role="presentation"
                onClick={() => setSelectChipType('cash')}
              />
              {aftType !== 'aft-out' && (
                <img
                  src={selectChipType === 'promo' ? junkSelectImage : junkImage}
                  alt="promo"
                  role="presentation"
                  onClick={() => setSelectChipType('promo')}
                />
              )}
            </div>
          </nav>

          <div
            className={styles.content}
            style={{
              opacity: showContent && 1,
              height: showContent && height / 1.6,
            }}
          >
            <div className={styles.title}>
              <div style={{ display: 'flex' }}>
                <span>{`選擇金額：${typeText()}`}</span>
                <NumberFormat
                  value={currentAmount}
                  displayType="text"
                  thousandSeparator
                />
              </div>
              {/* <span>{`選擇金額 (${typeText()}${currentAmount})`}</span> */}
              <NumberFormat
                value={point}
                displayType="text"
                thousandSeparator
                prefix="現有："
              />
            </div>

            <div className={styles['amount-box']}>
              {amountArr.map((el) => (
                <div
                  key={el}
                  id={el}
                  onClick={amountBtnClickHandler}
                  role="presentation"
                  className={`${styles['amount-btn']} ${classnames({
                    [`${styles['amount-btn-normal']}`]: currentAmount !== el,
                    [`${styles['amount-btn-action']}`]: currentAmount === el,
                  })}`}
                >
                  {el}
                </div>
              ))}
            </div>

            <Button
              loading={aftLoading}
              onClick={onSubmitHandler}
              className={styles.btn}
            >
              確認
            </Button>
          </div>
        </section>
      </div>
    </Mask>
  );
};

AftForm.propTypes = {
  isCashInOutClick: PropTypes.bool.isRequired,
  setIsCashInOutClick: PropTypes.func.isRequired,
  aftLoading: PropTypes.bool,
  point: PropTypes.number,
};

AftForm.defaultProps = {
  aftLoading: false,
  point: null,
};

export default AftForm;
