// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import { gsap } from 'gsap';

// // import { Image, Space } from 'antd-mobile';
// import styles from './SubBtn.module.scss';

// import subBtnHeaderImage from '../../../assets/button/sub-btn-header.webp';

// // Hooks
// import useDidUpdateEffect from '../../../hooks/useDidUpdatedEffect';

// // Helper
// import { getSubBtnImg, getSubBtnImgSelect } from '../../../utils/helper';

// const SubBtn = ({
//   // eslint-disable-next-line
//   subBtnRef,
//   brand,
//   showSubBtn,
//   setShowSubBtn,
//   buttonList,
//   currentSubBtn,
//   subBtnClickHandler,
// }) => {
//   // const getImage = (name) => {
//   //   let imgObj;
//   //   try {
//   //     //eslint-disable-next-line
//   //     imgObj = require(`../../../assets/button/aristocrat/sub/en/${name}.webp`);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   //   return imgObj;
//   // };

//   // const getImageSelect = (name) => {
//   //   let imgObj;
//   //   try {
//   //     //eslint-disable-next-line
//   //     imgObj = require(`../../../assets/button/aristocrat/sub/en/${name}-select.webp`);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   //   return imgObj;
//   // };

//   const subBtnEl = buttonList
//     && buttonList
//       .filter(
//         (btn) => btn.button_name !== 'max' && btn.button_name !== 'take-win',
//       )
//       .sort((a, b) => b.id - a.id)
//       .map((btn) => {
//         const { button_name: name, code, spin_effect: spinEffect } = btn || {};

//         const imgObj = getSubBtnImg({ name, brand });
//         const imgObjSelect = getSubBtnImgSelect({ name, brand });

//         return (
//           <div
//             key={name}
//             role="presentation"
//             onClick={() => subBtnClickHandler({ code, name, spinEffect })}
//             style={{
//               transform:
//                 currentSubBtn === name && 'translateY(-10px) scale(1.15)',
//               backgroundImage:
//                 currentSubBtn === name
//                   ? `url(${imgObjSelect})`
//                   : `url(${imgObj})`,
//             }}
//             className={styles['sub-btn']}
//           />
//         );
//       });

//   // 跳過第一次render，只有showSubBtn改變才執行動畫邏輯
//   useDidUpdateEffect(() => {
//     const tl = gsap.timeline();
//     if (showSubBtn) {
//       tl.to(subBtnRef, {
//         y: '-75%',
//         duration: 0.4,
//         ease: 'ease.out',
//       }).to(subBtnRef, {
//         y: '-70%',
//         duration: 1,
//         ease: 'bounce.out',
//       });
//     }

//     if (!showSubBtn) {
//       tl.to(subBtnRef, {
//         y: '-75%',
//         duration: 0.3,
//         ease: 'ease.in',
//       }).to(subBtnRef, {
//         y: '5%',
//         duration: 1.2,
//         ease: 'bounce.out',
//       });
//     }
//   }, [showSubBtn]);

//   return (
//     <>
//       <div
//         className={`
//             ${styles['sub-btn-header-box']}
//             ${classnames({
//           'sub-btn-header-animation': !showSubBtn,
//         })}
//           `}
//         onClick={() => setShowSubBtn((prev) => !prev)}
//         role="presentation"
//       >
//         <img src={subBtnHeaderImage} alt="sub-btn-header" />
//       </div>

//       <div className={styles['sub-btn-holder']}>{subBtnEl}</div>
//     </>
//   );
// };

// SubBtn.propTypes = {
//   showSubBtn: PropTypes.bool.isRequired,
//   brand: PropTypes.string.isRequired,
//   setShowSubBtn: PropTypes.func.isRequired,
//   buttonList: PropTypes.arrayOf(PropTypes.object).isRequired,
//   currentSubBtn: PropTypes.string.isRequired,
//   subBtnClickHandler: PropTypes.func.isRequired,
//   // subBtnRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
//   //   .isRequired,
// };

// export default SubBtn;
