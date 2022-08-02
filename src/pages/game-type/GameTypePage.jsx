import React, { useState, useEffect, useRef } from 'react';

// Router dom
import { useNavigate } from 'react-router-dom';

// Antd
// eslint-disable-next-line no-unused-vars
import { Button, NoticeBar, CapsuleTabs } from 'antd-mobile';
// eslint-disable-next-line no-unused-vars
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
// import { text } from '../Layout/Layout';

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
  const { egmList } = store.getState();

  const {
    data: selectEgmDta,
    // eslint-disable-next-line no-unused-vars
    isLoading: selectEgmLoading,
    // eslint-disable-next-line no-unused-vars
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const { id: egmID } = selectEgmDta || {};

  const genderSwitch = (gender) => {
    let returngender;
    switch (gender) {
    case 'female':
      returngender = 'w1';
      break;
    case 'male':
      returngender = 'm1';
      break;
    default:
      returngender = '';
      break;
    }
    console.log('gender => ', gender, returngender);
    return returngender;
  };

  const resetSlotList = (type, row) => {
    // eslint-disable-next-line no-unused-vars
    new Array(6).fill('').forEach((item, index) => {
      store.dispatch(changeSlot(parseInt(`${row + 1 }${ index + 1}`, 10), type, '5'));
    });
  };

  const resetPeopleList = (gender, row) => {
    // eslint-disable-next-line no-unused-vars
    new Array(6).fill('').forEach((item, index) => {
      store.dispatch(changePeople(parseInt(`${row + 1}${ index + 1}`, 10), genderSwitch(gender), 'vip'));
    });
  };

  const brandNameSwitch = (brandName) => {
    let returnName;
    switch (brandName) {
    case 'sammy':
      returnName = 'slot';
      break;
    case 'daito':
      returnName = 'slotGizon';
      break;
    default:
      returnName = 'slot';
      break;
    }
    console.log('brandName => ', brandName, returnName);
    return returnName;
  };

  const addPeopleSlot = () => {
    const jp = egmList.data?.filter((item) => item?.brand_name === showJpSlot.model);
    if (!jp) return;
    console.log('jp =>', jp);
    jp.forEach((item, index) => {
      if (Object.keys(item?.member).length > 0
      || item?.hasCredit
      || item?.waitingList?.length > 0) {
      //有人在遊戲中
        resetPeopleList(item?.member?.gender, index);
      } else {
        resetPeopleList('', index);
      }
      resetSlotList(brandNameSwitch(showJpSlot.model), index);
    });
  };

  useEffect(() => {
    addPeopleSlot();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [egmList]);

  useEffect(() => {
    if (!showJpSlot.action || !pixiRef.current) return;
    console.log('pixi', showJpSlot, pixiRef, pixiApp);
    const jpArr = egmList.data?.filter((item) => item.brand_name === showJpSlot.model);
    pixiApp.current = new PixiApp(pixiRef.current.clientWidth);
    pixiApp.current?.active(new Array(jpArr.length).fill(6)).then(() => {
      addPeopleSlot();
      console.log('showJpSlot', showJpSlot, pixiApp.current);
    });

    pixiRef.current.appendChild(pixiApp.current.view);
    return () => {
      pixiApp.current.destroy();
      try {
        if (pixiRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          pixiRef.current?.removeChild(pixiRef.current.children[0]);
        }
      } catch (error) {
        //pass
      }
    };

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
        {/* <header className={styles.header}>
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
        </div> */}

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

              {/* <CapsuleTabs.Tab disabled title="骰寶" key="dice">
                骰寶
              </CapsuleTabs.Tab>

              <CapsuleTabs.Tab disabled title="輪盤" key="roulette">
                輪盤
              </CapsuleTabs.Tab> */}
            </CapsuleTabs>
          </nav>
        )}

        {/* <div className={styles['footer-nav']}>
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
        </div> */}
      </div>
    </>
  );
};

export default GameTypePage;
