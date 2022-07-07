import React, { useEffect, useState, useRef } from 'react';

// Antd
import { Dialog, Toast } from 'antd-mobile';

import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Transition
import { CSSTransition } from 'react-transition-group';

// Components
import LoadingPage from '../LoadingPage';
import AftForm from '../../components/aft-form/AftForm';
import Jackpot from '../../components/jackpot/Jackpot';
import GameDescription from '../../components/game-play/game-description/GameDescription';
import ShowLive from '../../components/show-live/ShowLive';

// eslint-disable-next-line
import AutoForm from '../../components/auto-form/AutoForm';

// eslint-disable-next-line
import { getSocket, connectSocket, disconnectSocket } from '../../utils/socket';

// Hooks
import useRwd from '../../hooks/useRwd';

// Actions
import {
  cashInOut,
  clearCashInOutStatus,
  clearButtonPressStatus,
  clearSelectEgmData,
  clearLeaveEgm,
} from '../../store/actions/egmActions';

import { setCurrentMenu } from '../../store/actions/menuActions';

import { cleanJapanSlotState } from '../../store/actions/japanSlotActins';

// Helpers
import { getEgmBg } from '../../utils/helper';

const Aristocrat = React.lazy(() => import('../../components/game-play/Aristocrat/Aristocrat'));
const Aruze = React.lazy(() => import('../../components/game-play/Aruze/Aruze'));
const Igt = React.lazy(() => import('../../components/game-play/Igt/Igt'));
const Daito = React.lazy(() => import('../../components/game-play/Daito/Daito'));
const Sammy = React.lazy(() => import('../../components/game-play/Sammy/Sammy'));

const GamePlay = () => {
  // Ref
  const sdkRef = useRef();
  // Hooks
  // eslint-disable-next-line
  const { isMobile, isTablet } = useRwd();

  // Router prop
  const navigate = useNavigate();

  // Init state
  const [isCashInOutClick, setIsCashInOutClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [playStatus, setPlayStatus] = useState('loading');
  const [playVideo, setPlayVideo] = useState(false);
  const [showSubBtn, setShowSubBtn] = useState(false);
  const [currentSubBtn, setCurrentSubBtn] = useState('');
  const [isAuto, setIsAuto] = useState({ action: false, limit: null });
  const [showAutoForm, setShowAutoForm] = useState(false);

  // Redux
  const dispatch = useDispatch();

  const { data: SelectEgmData } = useSelector((state) => state.selectEgm);
  const { model, brand_name: brandName } = SelectEgmData || {};

  const {
    error: aftError,
    isLoading: aftLoading,
    data: aftData,
  } = useSelector((state) => state.cashInOut);

  const { data: userData } = useSelector((state) => state.user);
  const { online, token } = userData || {};
  const { online_id: onlineId, point } = online || {};

  const { data: aftFormData } = useSelector((state) => state.aftForm);
  const { aftType, currentAmount, selectChipType } = aftFormData || {};

  const { data: selectEgmData, currentBtnPress } = useSelector(
    (state) => state.selectEgm,
  );

  const {
    buttonList, ip, stream_url: url, name,
  } = selectEgmData || {};

  const { currentMenu } = useSelector((state) => state.menu);

  let image;

  if (model && brandName) {
    image = getEgmBg({ brandName, model });
  }

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      connectSocket(token);
    }
  }, [token]);

  // Aft Submit Call Api
  const aftSubmitHandler = () => {
    const data = {
      cashAmount: currentAmount,
      ip,
      onlineId,
      type: aftType,
      chipType: selectChipType,
    };

    dispatch(cashInOut(data));
  };

  const getSdkRef = (ref) => {
    sdkRef.current = ref;
  };

  const exitGameHandler = () => {
    sdkRef.current?.close();
    dispatch(cleanJapanSlotState());
    dispatch(clearButtonPressStatus());
    dispatch(clearCashInOutStatus());
    dispatch(clearSelectEgmData());
    dispatch(setCurrentMenu(''));
    dispatch(clearLeaveEgm());

    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  // 如果有aft form data , 就call開洗分api
  useEffect(() => {
    if (aftFormData) {
      aftSubmitHandler();
    }
    // eslint-disable-next-line
  }, [aftFormData]);

  // 開洗分成功
  useEffect(() => {
    if (aftData) {
      let text;

      if (aftType === 'aft-in') {
        text = '開分';
      }

      if (aftType === 'aft-out') {
        text = '洗分';
      }

      Dialog.alert({
        content: `${text}指令已送出，請確認機台分數是否正確。`,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearCashInOutStatus());
          setIsCashInOutClick(false);
        },
      });
    }
  }, [aftData, dispatch, aftType]);

  // 開洗分錯誤
  useEffect(() => {
    if (aftError) {
      setIsCashInOutClick(false);

      Dialog.alert({
        content: aftError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onClose: () => {
          dispatch(clearCashInOutStatus());
          setIsCashInOutClick(false);
        },
      });
    }
  }, [aftError, dispatch]);

  useEffect(() => {
    // window.history.pushState(null, null, null);

    const eventHandler = () => {
      window.history.pushState(null, null, null);
      // console.log('test');
      sdkRef.current?.close();
      window.location.reload();
    };

    window.addEventListener('popstate', eventHandler); // 按上一頁

    return () => {
      window.removeEventListener('popstate', eventHandler);
      // window.removeEventListener('beforeunload', eventHandler);
    };

    // eslint-disable-next-line
  }, []);

  // 視訊播放狀態
  useEffect(() => {
    Toast.config({
      position: 'center',
      duration: 0,
    });

    switch (playStatus) {
    case 'loading':
      Toast.show({
        icon: 'loading',
        content: '遊戲視訊加载中…',
        duration: 1000 * 60,
      });
      break;

    case 'wait':
      Toast.show({
        icon: 'loading',
        content: '遊戲視訊等待中…',
      });
      break;

    case 'error':
      Toast.show({
        icon: 'fail',
        content: '無法獲取遊戲視訊',
        duration: 2000,
      });
      break;

    case 'stalled':
      Toast.show({
        icon: 'fail',
        content: '遊戲視訊格式無法使用',
        duration: 2000,
      });
      break;

    default:
      Toast.clear();
    }

    return () => {
      Toast.clear();
    };
  }, [playStatus]);

  useEffect(() => {
    console.log(isAuto);
  }, [isAuto]);

  return (
    <>
      <CSSTransition
        in={!model || !brandName}
        classNames="animation-item"
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <LoadingPage />
      </CSSTransition>

      {/* 遊戲說明 */}
      <GameDescription visible={currentMenu === 'description'} />

      {/* 直撥 */}
      <ShowLive visible={currentMenu === 'show-live'} />

      {/* Jackpot */}
      <Jackpot visible={currentMenu === 'jp'} />

      {/* 開洗分表單 */}
      <AftForm
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
        aftLoading={aftLoading}
        point={point}
      />

      <AutoForm visible={showAutoForm} setVisible={setShowAutoForm} setIsAuto={setIsAuto} />

      <div
        style={{
          height: '100%',
          width: '100%',
          marginRight: currentMenu && !isMobile && !isTablet && '-40%',
          transition: 'all 0.35s',
        }}
      >
        {brandName === 'aristocrat' && (
          <Aristocrat
            model={model}
            image={image}
            buttonList={buttonList}
            url={url}
            ip={ip}
            getSdkRef={getSdkRef}
            setPlayStatus={setPlayStatus}
            playStatus={playStatus}
            exitGameHandler={exitGameHandler}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setIsCashInOutClick={setIsCashInOutClick}
            isCashInOutClick={isCashInOutClick}
            currentBtnPress={currentBtnPress}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            showSubBtn={showSubBtn}
            setShowSubBtn={setShowSubBtn}
            currentSubBtn={currentSubBtn}
            setCurrentSubBtn={setCurrentSubBtn}
            isAuto={isAuto}
            setIsAuto={setIsAuto}
            showAutoForm={showAutoForm}
            setShowAutoForm={setShowAutoForm}
          />
        )}

        {brandName === 'aruze' && (
          <Aruze
            model={model}
            image={image}
            buttonList={buttonList}
            url={url}
            ip={ip}
            getSdkRef={getSdkRef}
            setPlayStatus={setPlayStatus}
            playStatus={playStatus}
            exitGameHandler={exitGameHandler}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setIsCashInOutClick={setIsCashInOutClick}
            isCashInOutClick={isCashInOutClick}
            currentBtnPress={currentBtnPress}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            showSubBtn={showSubBtn}
            setShowSubBtn={setShowSubBtn}
            currentSubBtn={currentSubBtn}
            setCurrentSubBtn={setCurrentSubBtn}
            setIsAuto={setIsAuto}
            isAuto={isAuto}
          />
        )}

        {brandName === 'igt' && (
          <Igt
            model={model}
            image={image}
            buttonList={buttonList}
            url={url}
            ip={ip}
            getSdkRef={getSdkRef}
            setPlayStatus={setPlayStatus}
            playStatus={playStatus}
            exitGameHandler={exitGameHandler}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setIsCashInOutClick={setIsCashInOutClick}
            isCashInOutClick={isCashInOutClick}
            currentBtnPress={currentBtnPress}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            showSubBtn={showSubBtn}
            setShowSubBtn={setShowSubBtn}
            currentSubBtn={currentSubBtn}
            setCurrentSubBtn={setCurrentSubBtn}
          />
        )}

        {brandName === 'daito' && (
          <Daito
            model={model}
            image={image}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            exitGameHandler={exitGameHandler}
            url={url}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            getSdkRef={getSdkRef}
            ip={ip}
            name={name}
            brand={brandName}
          />
        )}

        {brandName === 'sammy' && (
          <Sammy
            model={model}
            image={image}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            exitGameHandler={exitGameHandler}
            url={url}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            playStatus={playStatus}
            setPlayStatus={setPlayStatus}
            getSdkRef={getSdkRef}
            ip={ip}
            name={name}
            brand={brandName}
          />
        )}
      </div>
    </>
  );
};

export default GamePlay;
