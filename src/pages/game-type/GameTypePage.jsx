import React, { useState, useEffect, useRef } from 'react';

// Router dom
import { useNavigate } from 'react-router-dom';

// Antd
import { Button, NoticeBar, CapsuleTabs } from 'antd-mobile';
import { UserCircleOutline } from 'antd-mobile-icons';

import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';

import { store } from '../../store/index';

// Components
import SlotList from '../../components/slot-list/SlotList';
import JpSlotSelect from '../../components/jp-slot/jp-slot-select/JpSlotSelect';

// Layout
import { text } from '../Layout/Layout';

// Pixi
import { PixiApp } from '../../pixi/jp-slot/scripts/PixiApp';

// Styles
import styles from './GameTypePage.module.scss';
import { setPixiStatus } from '../../store/actions/pixiAction';

const jpSlotList = ['sammy', 'daito'];

const GameTypePage = () => {
  const navigate = useNavigate();

  const [height] = useWindowSize();

  const [showJpSlot, setShowJpSlot] = useState({ action: true, model: null });
  const { action: showJpSelectAction } = useSelector((state) => state.pixi);

  const {
    data: selectEgmDta,
    // eslint-disable-next-line no-unused-vars
    isLoading: selectEgmLoading,
    // eslint-disable-next-line no-unused-vars
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const pixiRef = useRef(null);
  const { id: egmID } = selectEgmDta || {};

  useEffect(() => {
    if (!showJpSlot.action || !pixiRef) return;
    const pixiApp = new PixiApp(pixiRef.current.clientWidth);
    pixiApp.Start([6, 3, 5], 3);
    pixiRef.current.appendChild(pixiApp.view);
    return () => {
      pixiApp.destroy();
    };
  }, [showJpSlot]);

  // 有egmID 代表select egm 成功
  useEffect(() => {
    if (egmID) {
      navigate('/game-play', { replace: true });
      window.history.pushState(null, null, null);
    }
  }, [egmID, navigate]);

  useEffect(() => {
    console.log('showJpSelectAction => ', showJpSelectAction);
  }, [showJpSelectAction]);
  useEffect(() => {
    store.dispatch(setPixiStatus(false));
  }, []);

  const openJpSelect = () => {

  };

  const closeJpSelect = () => {
    store.dispatch(setPixiStatus(false));
  };

  return (
    <>
      <div
        className={styles.container}
        style={{ width: window.innerWidth, height: window.innerHeight }}
      >
        <header className={styles.header}>
          <span
            role="presentation"
            className={styles.logo}
            onClick={() => navigate('/')}
          >
            LOGO
          </span>
          <UserCircleOutline style={{ marginRight: '1rem' }} />
          <Button color="warning" fill="outline">
            登出
          </Button>
        </header>
        <div className={styles.marquee}>
          <NoticeBar
            style={{
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            content={text}
          />
        </div>

        {showJpSlot.action && (
          <>
            {showJpSelectAction && (
              <JpSlotSelect
                visible={showJpSlot.action}
                hidden={closeJpSelect}
                showJpSelectAction={showJpSelectAction}
              />
            )}

            <div className={styles['jp-slot-header']}>
              <div
                className={styles.back}
                role="presentation"
                onClick={() => setShowJpSlot({ action: false, model: null })}
              />
              <div className={styles.title}>
                {`${showJpSlot.model?.toUpperCase()}遊戲大廳`}
              </div>
            </div>
            <nav className={styles.nav}>
              <CapsuleTabs
                defaultActiveKey={showJpSlot.model}
                onChange={(key) => {
                  setShowJpSlot((prev) => ({
                    ...prev,
                    model: key,
                  }));
                }}
              >
                {jpSlotList.map((el) => (
                  <CapsuleTabs.Tab
                    key={el}
                    title={el.toUpperCase()}
                    className={styles.tab}
                  >
                    <div
                      className={styles.body}
                      style={{ height: height * 0.63 }}
                    >
                      <div
                        role="presentation"
                        style={{ cursor: 'pointer' }}
                        onClick={openJpSelect}
                        id="jp-pixi"
                        ref={pixiRef}
                      />
                    </div>
                  </CapsuleTabs.Tab>
                ))}
              </CapsuleTabs>
            </nav>
          </>
        )}

        {!showJpSlot.action && (
          <nav className={styles.nav}>
            <CapsuleTabs>
              <CapsuleTabs.Tab title="老虎機" key="slot" className={styles.tab}>
                <div className={styles.body} style={{ height: height * 0.69 }}>
                  <SlotList />
                </div>
              </CapsuleTabs.Tab>

              <CapsuleTabs.Tab title="日本Slot" key="jp-slot">
                <div className={styles.body} style={{ height: height * 0.69 }}>
                  {jpSlotList.map((el) => (
                    <div
                      role="presentation"
                      onClick={() => setShowJpSlot({ action: true, model: el })}
                      key={el}
                      model={el}
                      className={styles['jp-slot-box']}
                    />
                  ))}
                </div>
              </CapsuleTabs.Tab>

              <CapsuleTabs.Tab disabled title="骰寶" key="dice">
                骰寶
              </CapsuleTabs.Tab>

              <CapsuleTabs.Tab disabled title="輪盤" key="roulette">
                輪盤
              </CapsuleTabs.Tab>
            </CapsuleTabs>
          </nav>
        )}

        <div className={styles['footer-nav']}>
          <div
            role="presentation"
            onClick={() => navigate('/home')}
            className={styles['footer-btn']}
          >
            首頁
          </div>
          <div
            role="presentation"
            onClick={() => navigate('/home')}
            className={styles['footer-btn']}
          >
            彩金
          </div>
          <div
            role="presentation"
            onClick={() => navigate('/home')}
            className={styles['footer-btn']}
          >
            會員
          </div>
          <div
            role="presentation"
            onClick={() => navigate('/home')}
            className={styles['footer-btn']}
          >
            直播
          </div>
          <div
            role="presentation"
            onClick={() => navigate('/home')}
            className={styles['footer-btn']}
          >
            客服
          </div>
        </div>
      </div>
    </>
  );
};

export default GameTypePage;
