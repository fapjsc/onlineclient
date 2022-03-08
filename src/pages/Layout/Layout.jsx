import React from 'react';

import { NoticeBar } from 'antd-mobile';

import { useLocation, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

// Hooks
import useWindowSize from '../../hooks/useWindowSize';

const text = `
【普丁侵略計劃受阻再失猛將！】
俄羅斯投入大量兵力侵犯烏克蘭，但攻勢卻停滯不前，侵烏計劃不但連番阻礙，連不少高階將領都在這場侵略戰爭中喪命；
領導俄羅斯斯巴達獨立偵察營的指揮官佐加（Vladimir Zhoga）上週末不幸戰死烏克蘭，
成為普丁攻打烏克蘭計劃的又一重大打擊，重創俄軍士氣。

【例行維護公告】
DLS 平台系統將於時間 03 月 07 日 13:30 - 16:00 ( GMT+8 ) 進行維護,
維護如有延後, 將另行通知,期間相關的網頁將無法登入, 不便之處, 敬請諒解.      

【歐盟：近日開峰會 討論接納烏克蘭】
〔編譯茅毅／綜合報導〕針對烏克蘭總統澤倫斯基（Volodymyr Zelensky）申請加入歐盟，歐洲理事會主席米歇爾（Charles Michel）七日表示，歐盟近日將舉行高峰會，將認真考慮是否接納烏克蘭加入歐盟。
 米歇爾透過「推特」表示，烏克蘭人的團結讓歐盟印象深刻，歐盟對烏克蘭的友誼及援助的承諾也堅定不移，「我們將在未來幾天討論烏克蘭申請加入歐盟一事。」他還說，會與澤倫斯基保持密切聯繫。
 澤倫斯基上月底呼籲歐盟啟動緊急程序，馬上接納烏克蘭加入歐盟，「我們十分感謝盟友們對烏克蘭的支持，但我們的目標是與所有歐洲人站在一起，力求與他們平等，我相信這是我們應得的，我也相信我們很有機會加入（歐盟）。」

`;

const Layout = () => {
  const [height, width] = useWindowSize();

  const { pathname } = useLocation();

  if (pathname?.includes('game-play')) {
    return (
      <div
        style={{
          height,
          width,
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className={styles['big-bg']}>
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height,
        width,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className={styles['big-bg']}>
        <div className={styles.container}>
          <div className={styles['notify-box']}>
            <div className={styles.notify}>
              <NoticeBar
                style={{
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                content={text}
              />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
