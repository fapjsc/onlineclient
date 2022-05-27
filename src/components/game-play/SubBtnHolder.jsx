import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { gsap } from 'gsap';

// Redux
import { useSelector } from 'react-redux';

// Hooks
import useDidUpdateEffect from '../../hooks/useDidUpdatedEffect';

// Styles
import styles from './SubBtnHolder.module.scss';
import subBtnHeaderImage from '../../assets/button/sub-btn-header.webp';
import '../../sass/animation.scss';

// Config
import styleConfig from '../../config/styleConfig';

const SubBtnHolder = ({
  subBtnRef,
  showSubBtn,
  setShowSubBtn,
  height,
  maxHeight,
  lowest,
  subBtnEl,
}) => {
  const { currentMenu } = useSelector((state) => state.menu);

  // 跳過第一次render，只有showSubBtn改變才執行動畫邏輯
  useDidUpdateEffect(() => {
    const tl = gsap.timeline();

    if (showSubBtn) {
      tl.to(subBtnRef, {
        y: maxHeight,
        duration: 0.4,
        ease: 'ease.out',
      }).to(subBtnRef, {
        y: height,
        duration: 1,
        ease: 'bounce.out',
      });
    }

    if (!showSubBtn) {
      tl.to(subBtnRef, {
        y: maxHeight,
        duration: 0.3,
        ease: 'ease.in',
      }).to(subBtnRef, {
        y: lowest,
        duration: 1.2,
        ease: 'bounce.out',
      });
    }
  }, [showSubBtn]);

  return (
    <>
      <div
        className={`${styles['sub-btn-header-box']} ${classnames({
          'sub-btn-header-animation': !showSubBtn,
        })}`}
        onClick={() => setShowSubBtn((prev) => !prev)}
        role="presentation"
        style={{ zIndex: styleConfig.zIndex.max }}
      >
        <img
          style={{ opacity: currentMenu && 0.5 }}
          src={subBtnHeaderImage}
          alt="sub-btn-header"
        />
      </div>

      <div className={styles['sub-btn-holder']}>{subBtnEl}</div>
    </>
  );
};

SubBtnHolder.propTypes = {
  height: PropTypes.string,
  maxHeight: PropTypes.string,
  lowest: PropTypes.string,
  showSubBtn: PropTypes.bool.isRequired,
  setShowSubBtn: PropTypes.func.isRequired,
  subBtnRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  subBtnEl: PropTypes.node.isRequired,
};

SubBtnHolder.defaultProps = {
  height: '-70%',
  maxHeight: '-75%',
  lowest: '5%',
  subBtnRef: null,
};

export default SubBtnHolder;
