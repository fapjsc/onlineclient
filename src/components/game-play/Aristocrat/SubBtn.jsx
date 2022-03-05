// const subBtnList = [
//   'bet-1',
//   'bet-2',
//   'bet-5',
//   'bet-10',
//   'bet-15',
//   '1-1',
//   '1-2',
//   '1-3',
//   '1-4',
//   '1-5',
// ];

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './SubBtn.module.scss';

import subBtnHeaderImage from '../../../assets/button/sub-btn-header.png';

const SubBtn = ({
  showSubBtn,
  setShowSubBtn,
  buttonList,
  currentSubBtn,
  subBtnClickHandler,
}) => {
  const subBtnEl = buttonList
    && buttonList
      .sort((a, b) => b.id - a.id)
      .map((btn) => {
        const { button_name: name, code } = btn || {};

        let imgObj;
        let imgObjSelect;

        try {
          //eslint-disable-next-line
          imgObj = require(`../../../assets/button/aristocrat/sub/en/${name}.png`);
          //eslint-disable-next-line
          imgObjSelect = require(`../../../assets/button/aristocrat/sub/en/${name}-select.png`);
        } catch (error) {
          console.log(error);
        }

        return (
          <div
            key={name}
            role="presentation"
            onClick={() => subBtnClickHandler({ code, name })}
            style={{
              transform:
                currentSubBtn === name && 'translateY(-10px) scale(1.15)',
              backgroundImage:
                currentSubBtn === name
                  ? `url(${imgObjSelect})`
                  : `url(${imgObj})`,
            }}
            className={styles['sub-btn']}
          />
        );
      });

  return (
    <>
      <div
        className={`
            ${styles['sub-btn-header-box']} 
            ${classnames({ 'sub-btn-header-animation': !showSubBtn })}
          `}
        onClick={() => setShowSubBtn((prev) => !prev)}
        onKeyDown={() => {}}
        role="presentation"
      >
        <img src={subBtnHeaderImage} alt="sub-btn-header" />
      </div>

      <div className={styles['sub-btn-holder']}>{subBtnEl}</div>
    </>
  );
};

SubBtn.propTypes = {
  showSubBtn: PropTypes.bool.isRequired,
  setShowSubBtn: PropTypes.func.isRequired,
  buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSubBtn: PropTypes.string.isRequired,
  subBtnClickHandler: PropTypes.func.isRequired,
  subBtnRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

export default SubBtn;
