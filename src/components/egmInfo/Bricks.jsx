/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import styles from './Bricks.module.scss';

const mainStyle = {
  RB: 'container-redBg',
  BB: 'container-orangeBg',
  empty: 'container-noneBg',
  green: 'container-greenBg',
  current: 'container-currentBg',
  start: 'container-startBg',
  bonus: 'container-seaBlueBg',
  text: 'container-text',
};

const bonusDefault = [{
  id: 0,
  type: '',
  count: 0,
}];

const Bricks = ({
  // eslint-disable-next-line no-unused-vars
  data, game, totalGame, fetchBonus,
}) => {
  const slideRef = useRef(null);
  // if (!data) return <></>;
  const empty = new Array(143).fill({ className: mainStyle.empty, text: '' });
  const bonusData = (data?.bonusList || data?.bounsList) || bonusDefault;
  // console.log('empty =>', empty);
  // console.log('data =>', data);
  // console.log('bonusData =>', bonusData);
  //如果不滿10筆資料 填滿
  const transfer = [
    {
      id: 0,
      type: '',
      count: game < 100 ? 100 : game,
    }, //first column
    ...bonusData,
    // 10 - bonusData?.length !== 0
    //   ? [
    //     ...new Array(10 - bonusData?.length)
    //       .fill('').map((item, index) => (
    //         {
    //           id: index + 1 + 10 - bonusData?.length,
    //           type: '',
    //           count: 0,
    //         }
    //       ))]
    //   : bonusData,
  ];

  transfer?.forEach((bonusItem, bonusIndex) => {
    let count = Math.ceil((bonusItem?.count || 0) / 100); //取最大整
    const type = bonusItem?.type;
    // eslint-disable-next-line no-plusplus
    for (let empIdx = 143 - (11 - bonusIndex); empIdx >= 0; empIdx -= 11) {
      if (empIdx % 11 === 0) {
        //  最左邊的一排
        switch (empIdx) {
        case 132:
          empty[empIdx] = {
            className: mainStyle.text,
            text: 'bonus',
          };
          break;
        case 121:
          empty[empIdx] = {
            className: mainStyle.text,
            text: 'start',
          };
          break;
        case 110:
          empty[empIdx] = {
            className: mainStyle.text,
            text: 'current',
          };
          break;
        default:
          // console.log('hihi => ', empIdx, count, game);
          if (count > 0) {
            empty[empIdx] = {
              className: mainStyle.green,
              text: '',
            };
            count -= 1;
          } else {
            empty[empIdx] = {
              className: mainStyle.empty,
              text: '',
            };
          }
          break;
        }
        // eslint-disable-next-line no-continue
        continue;
      }

      if (empIdx < 110) {
        //底下三行以上
        if (count > 0) {
          empty[empIdx] = {
            className: mainStyle.green,
            text: '',
          };
          count -= 1;
        } else {
          empty[empIdx] = {
            className: mainStyle.empty,
            text: '',
          };
        }
      } else {
        //底下三行以下
        switch (true) {
        case empIdx > 132:
          //倒數第一行  => bonus
          if (type === 'RB') {
            empty[empIdx] = {
              className: mainStyle.RB,
              text: '',
            };
          } else if (type === 'BB') {
            empty[empIdx] = {
              className: mainStyle.BB,
              text: '',
            };
          } else {
            empty[empIdx] = {
              className: mainStyle.bonus,
              text: '',
            };
          }
          break;
        case empIdx > 121:
          //倒數第二行 => start
          empty[empIdx] = {
            className: mainStyle.start,
            text: bonusItem?.count || 0,
          };
          break;
        case empIdx > 110:
          //倒數第三行  => current
          empty[empIdx] = {
            className: mainStyle.current,
            text: bonusIndex,
          };
          break;
        default:
          empty[empIdx] = {
            className: mainStyle.bonus,
            text: '',
          };
          break;
        }
      }
    }
  });
  useEffect(() => {
    slideRef.current.style.overflow = 'hidden';
    if (fetchBonus.status && slideRef.current) {
      const width = slideRef.current.clientWidth;
      const scrollPosition = slideRef.current.scrollLeft;
      slideRef.current.style.overflow = 'scroll';
      // console.log(width, scrollPosition);
      if (fetchBonus.position === 'left') {
        slideRef.current.scroll(-1 * width + scrollPosition, 0);
        slideRef.current.style.opacity = 0;
      } else if (fetchBonus.position === 'right') {
        slideRef.current.scroll(width + scrollPosition, 0);
        slideRef.current.style.opacity = 0;
      } else if (fetchBonus.position === 'init') {
        slideRef.current.scroll(0, 0);
        slideRef.current.style.opacity = 0;
      }
      setTimeout(() => {
        slideRef.current.scroll(width, 0);
        setTimeout(() => {
          slideRef.current.style.opacity = 1;
        }, 600);
      }, 400);
      slideRef.current.style.overflow = 'hidden';
    }
  }, [fetchBonus]);
  return (
    <div ref={slideRef} className={styles.switch}>
      <div className={styles.container} />
      <div className={styles.container}>

        {
          empty.map((item, index) =>
          // eslint-disable-next-line react/no-array-index-key, implicit-arrow-linebreak
            <div key={index} className={styles[item.className]}>{item.text}</div>)
        }
      </div>
      <div className={styles.container} />
    </div>
  );
};
export default Bricks;
