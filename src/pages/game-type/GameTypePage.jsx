import React, { useState, useEffect, useRef } from 'react';

// Router dom
import { useNavigate } from 'react-router-dom';

// Antd
import { Button, NoticeBar, CapsuleTabs } from 'antd-mobile';
import { UserCircleOutline } from 'antd-mobile-icons';

import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
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
import { changePeople, changeSlot, setPixiStatus } from '../../store/actions/pixiAction';

const jpSlotList = ['sammy', 'daito'];

const GameTypePage = () => {
  const navigate = useNavigate();

  const [height] = useWindowSize();

  const [showJpSlot, setShowJpSlot] = useState({ action: false, model: null });
  const { action: showJpSelectAction, slotType } = useSelector((state) => state.pixi);

  const pixiRef = useRef(null);
  const pixiApp = useRef(null);

  const {
    data: selectEgmDta,
    // eslint-disable-next-line no-unused-vars
    isLoading: selectEgmLoading,
    // eslint-disable-next-line no-unused-vars
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const { id: egmID } = selectEgmDta || {};

  const addPeopleSlot = () => {
    if (showJpSlot.model === 'sammy') {
      [6].forEach((item, index) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < item; i++) {
          const id = parseInt(`${index + 1 }${i + 1}`, 10);
          store.dispatch(changeSlot(id, 'slot', '4'));
          store.dispatch(changePeople(id, 'w1', 'vip'));
        }
      });
    } else if (showJpSlot.model === 'daito') {
      [6].forEach((item, index) => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < item; i++) {
          const id = parseInt(`${index + 1 }${i + 1}`, 10);
          store.dispatch(changeSlot(id, 'slotGizon', '4'));
          store.dispatch(changePeople(id, 'w1', 'vip'));
        }
      });
    }
  };

  useEffect(() => {
    if (!showJpSlot.action || !pixiRef.current || !pixiApp.current) return;
    pixiRef.current.appendChild(pixiApp.current.view);
    console.log('showJpSlot', showJpSlot, pixiApp.current);
    addPeopleSlot();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showJpSlot]);

  useEffect(() => {
    console.log('pixi', showJpSlot, pixiRef, pixiApp);
    if (!showJpSlot.action || !pixiRef) return;
    if (pixiApp.current) return;
    console.log();
    pixiApp.current = new PixiApp(pixiRef.current.clientWidth);
    pixiApp.current.active([6]).then(() => {
      addPeopleSlot();
    });
    // axios({
    //   method: 'GET',
    //   url: 'http://127.0.0.1:5001/pixi',
    //   headers: { 'Content-Type': 'application/json' },
    // }).then((response) => {
    //   const { data } = response;
    //   const slotCount = Object.keys(data).map((item) => data[item].length);

    //   if (slotCount.length > 3) {
    //     pixiApp.current.renderer.autoResize = true;
    // eslint-disable-next-line max-len
    //     pixiApp.current.renderer.resize(pixiRef.current.clientWidth, 1206 + 300 * (slotCount.length - 3));
    //     console.log('resize');
    //   }

    //   pixiApp.current.active(slotCount).then(() => {
    //     Object.keys(data).forEach((item, index) => {
    //       data[item].forEach((element) => {
    //         const id = parseInt(`${index + 1 }${ element.id}`, 10);
    //         console.log(id);
    //         store.dispatch(changePeople(id, element.member.sexual, element.member.level));
    //         store.dispatch(changeSlot(id, element.machine, element.mode));
    //       });
    //     });
    //   });

    //   console.log(Object.keys(data), slotCount);
    // });

    pixiRef.current.appendChild(pixiApp.current.view);
    console.log(pixiRef.current);
    let a = 'w1';
    setInterval(() => {
      //store.dispatch(changeSlot(13, 'slotGizon', '4'));
      store.dispatch(changePeople(13, a, 'vip'));
      if (a === 'w1') {
        a = 'w2';
      } else if (a === 'w2') {
        a = 'm1';
      } else if (a === 'm1') {
        a = '';
      }
    }, [5000]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showJpSlot]);

  // 有egmID 代表select egm 成功
  useEffect(() => {
    if (egmID) {
      navigate('/game-play', { replace: true });
      window.history.pushState(null, null, null);
    }
  }, [egmID, navigate]);

  useEffect(() => {
    console.log('pixiData => ', showJpSelectAction, slotType);
  }, [showJpSelectAction, slotType]);

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
                slotType={slotType}
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
