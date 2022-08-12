/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

// Router dom
import { useNavigate } from 'react-router-dom';

// Antd
// eslint-disable-next-line no-unused-vars
import {
  Button,
  NoticeBar,
  CapsuleTabs,
  Toast,
} from 'antd-mobile';
// eslint-disable-next-line no-unused-vars
import { UserCircleOutline } from 'antd-mobile-icons';

import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import useWindowSize from '../../hooks/useWindowSize';

import { store } from '../../store/index';
// eslint-disable-next-line no-unused-vars
import { getEgmImage, getBrandImage } from '../../utils/helper';

// actions
import {
  getEgmList,
  selectEgm,
  getBrandList,
} from '../../store/actions/egmActions';

// Components
// eslint-disable-next-line no-unused-vars
import SlotSelect from '../../components/jp-slot/jp-slot-select/SlotSelect';

// Layout
import { text } from '../Layout/Layout';

// Pixi
import { PixiApp } from '../../pixi/jp-slot/scripts/PixiApp';

// Styles
import styles from './GameTypePage.module.scss';
import { changePeople, changeSlot, setPixiStatus } from '../../store/actions/pixiAction';
//type
import { egmActionTypes } from '../../store/types';
import { showWarningWindow } from '../../store/actions/warningAction';

import Bounce from '../../HOC/Bounce';

const jpSlotList = ['sammy', 'daito'];
const slotList = ['igt', 'aruze', 'aristocrat'];
const peopleSexual = ['m1', 'w1', 'w2'];

const Bouncing = Bounce();

const GameTypePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const egmListLoadingRef = useRef();
  const selectEgmLoadingRef = useRef();

  const [height] = useWindowSize();

  const [showSlot, setShowSlot] = useState({ action: false, brandName: null });

  const pixiRef = useRef(null);
  const { egmList } = store.getState();

  const {
    data: selectEgmDta,
    // eslint-disable-next-line no-unused-vars
    isLoading: selectEgmLoading,
    // eslint-disable-next-line no-unused-vars
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const {
    // eslint-disable-next-line
    data: egmListData,
    error: egmListError,
    isLoading: egmListLoading,
  } = useSelector((state) => state.egmList);

  const {
    // data: brandListData,
    error: brandListError,
    // eslint-disable-next-line
    isLoading: brandListLoading,
  } = useSelector((state) => state.brand);

  const dispatchData = () => {
    dispatch(getEgmList());
    dispatch(getBrandList());
  };

  const { id: egmID } = selectEgmDta || {};

  const resetSlotList = (brandName, model, row, egmId) => {
    // eslint-disable-next-line no-unused-vars
    new Array(6).fill('').forEach((item, index) => {
      store.dispatch(
        changeSlot(parseInt(`${row + 1 }${ index + 1}`, 10), brandName, model, '5', jpSlotList.indexOf(brandName) !== -1 ? '' : 'd1', egmId),
      );
    });
  };

  const resetPeopleList = (isPlaying, row) => {
    // eslint-disable-next-line no-unused-vars
    new Array(6).fill('').forEach((item, index) => {
      let sexual;
      if (isPlaying) {
        sexual = peopleSexual[Math.floor(Math.random() * 3)];
      } else {
        sexual = '';
      }
      store.dispatch(changePeople(parseInt(`${row + 1}${ index + 1}`, 10), sexual, 'vip'));
    });
  };

  const findSlot = () => {
    let slot;
    if (jpSlotList.indexOf(showSlot.brandName) !== -1) {
      slot = egmList.data?.filter((item) => item?.brand_name === showSlot.brandName);
    } else {
      slot = egmList.data?.filter((item) => slotList.indexOf(item?.brand_name) !== -1);
    }
    return slot;
  };

  const addPeopleSlot = () => {
    const slot = findSlot();

    if (!slot) return;
    console.log('slot =>', slot);
    slot.forEach((item, index) => {
      try {
        if (Object.keys(item?.member)?.length > 0
        || item?.hasCredit
        || item?.waitingList?.length > 0) {
        //有人在遊戲中
          resetPeopleList(true, index);
        } else {
          resetPeopleList(false, index);
        }
      } catch {
        store.dispatch(showWarningWindow('on', 'warning', () => navigate('/'), '尚未有機器可供選擇'));
      }
      resetSlotList(item?.brand_name, item?.model, index, item.id);
    });
  };

  useEffect(() => {
    addPeopleSlot();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [egmList]);

  useEffect(() => {
    dispatchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!showSlot.action) return;
    const slot = findSlot();
    const pixiApp = new PixiApp(pixiRef.current?.clientWidth, showSlot.brandName);
    pixiApp?.active(new Array(slot?.length).fill(6)).then(() => {
      dispatchData();
    });
    pixiRef.current?.appendChild(pixiApp?.view);
    console.log('pixi', showSlot, pixiRef, pixiApp, pixiRef.current?.children[0]);
    setTimeout(() => {
      console.log('scroll');
      // pixiRef.current.scrollTop = 400;
    }, 4000);
    return () => {
      pixiApp?.destroy();
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
  }, [showSlot]);

  // 有egmID 代表select egm 成功
  useEffect(() => {
    if (egmID) {
      navigate('/game-play', { replace: true });
      window.history.pushState(null, null, null);
    }
  }, [egmID, navigate]);

  useEffect(() => {
    store.dispatch(setPixiStatus(false));
    console.log('showSlot => ', showSlot);
  }, [showSlot]);

  // eslint-disable-next-line no-unused-vars
  const openSelect = () => {

  };

  // eslint-disable-next-line no-unused-vars
  const closeSelect = () => {
    store.dispatch(setPixiStatus(false));
  };

  useEffect(() => {
    if (egmListLoading) {
      egmListLoadingRef.current = Toast.show({
        icon: 'loading',
        content: '遊戲加载中!',
        position: 'center',
      });
    }

    return () => {
      egmListLoadingRef.current?.close();
    };
  }, [egmListLoading]);

  useEffect(() => {
    if (selectEgmLoading) {
      selectEgmLoadingRef.current = Toast.show({
        icon: 'loading',
        content: '請稍等…',
        position: 'center',
        duration: 0,
      });
    }

    return () => {
      selectEgmLoadingRef.current?.close();
    };
  }, [selectEgmLoading]);

  const confirmBtnAction = () => {
    dispatch({ type: egmActionTypes.CLEAR_BRAND_LIST_STATUS });
    dispatch({ type: egmActionTypes.CLEAR_SELECT_EGM_DATA });
    dispatch({ type: egmActionTypes.CLEAR_EGM_LIST_STATUS });
  };

  useEffect(() => {
    let windowText;
    if (brandListError) windowText = brandListError;
    if (selectEgmError) windowText = selectEgmError;
    if (egmListError) windowText = egmListError;
    if (brandListError || selectEgmError || egmListError) {
      store.dispatch(showWarningWindow('on', 'warning', confirmBtnAction, windowText));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandListError, selectEgmError, egmListError]);

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

        {showSlot.action && (
          <>

            <SlotSelect
              hidden={closeSelect}
            />

            <div className={styles['jp-slot-header']}>
              <Bouncing
                className={styles.back}
                role="presentation"
                onClick={(event) => {
                  setShowSlot({ action: false, brandName: null });
                }}
              />
              <div className={styles.btn}>
                {
                  jpSlotList.indexOf(showSlot.brandName) !== -1
                  && jpSlotList.map((item) => (
                    <Bouncing
                      role="presentation"
                      onClick={(event) => {
                        setShowSlot((prev) => ({ ...prev, brandName: item }));
                      }}
                      className={styles[showSlot.brandName === item ? 'navBtn-click' : 'navBtn-origin']}
                    >
                      {item === 'sammy' ? '北斗' : '吉宗'}
                    </Bouncing>
                  ))
                }
                {
                  slotList.indexOf(showSlot.brandName) !== -1
                  && slotList.map((item) => (
                    <Bouncing
                      role="presentation"
                      onClick={(event) => {
                        setShowSlot((prev) => ({ ...prev, brandName: item }));
                      }}
                      className={styles[showSlot.brandName === item ? 'navBtn-click' : 'navBtn-origin']}
                    >
                      {item.toUpperCase()}
                    </Bouncing>
                  ))
                }
              </div>
            </div>
            {/* eslint-disable-next-line max-len */}
            {jpSlotList.indexOf(showSlot.brandName) !== -1
                  && (
                    <div
                      className={styles.body}
                      style={{ height: height * 0.63 }}
                    >
                      <div
                        role="presentation"
                        style={{ cursor: 'pointer' }}
                        onClick={openSelect}
                        id="jp-pixi"
                        ref={pixiRef}
                      />
                    </div>
                  )}
            {slotList.indexOf(showSlot.brandName) !== -1
                  && (

                    <div
                      className={styles.body}
                      style={{ height: height * 0.63 }}
                    >
                      <div
                        role="presentation"
                        style={{ cursor: 'pointer' }}
                        onClick={openSelect}
                        id="jp-pixi"
                        ref={pixiRef}
                      />
                    </div>
                  )}
          </>
        )}

        {!showSlot.action && (
          <nav className={styles.nav}>
            <CapsuleTabs>
              <CapsuleTabs.Tab title="老虎機" key="slot" className={styles.tab}>
                <div className={styles.body} style={{ height: height * 0.69 }}>
                  {
                    slotList?.map((el) => (
                      <img
                        alt={`${el}機台`}
                        role="presentation"
                        onClick={() => setShowSlot({ action: true, brandName: el })}
                        key={el}
                        // eslint-disable-next-line import/no-dynamic-require, global-require
                        src={require(`../../assets/廠牌按鈕素材/${el}_無框.webp`)}
                        className={styles['jp-slot-box']}
                      />
                    ))
                  }

                </div>
              </CapsuleTabs.Tab>

              <CapsuleTabs.Tab title="日本Slot" key="jp-slot">
                <div className={styles.body} style={{ height: height * 0.69 }}>
                  {jpSlotList.map((el) => (
                    <img
                      alt={`${el}機台`}
                      role="presentation"
                      onClick={() => setShowSlot({ action: true, brandName: el })}
                      key={el}
                      // eslint-disable-next-line import/no-dynamic-require, global-require
                      src={require(`../../assets/廠牌按鈕素材/${el}_無框.webp`)}
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
