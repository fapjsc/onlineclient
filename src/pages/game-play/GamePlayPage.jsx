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

// Hooks
import useRwd from '../../hooks/useRwd';

// Actions
import {
  cashInOut,
  clearCashInOutStatus,
  clearButtonPressStatus,
  clearSelectEgmData,
} from '../../store/actions/egmActions';

import { setCurrentMenu } from '../../store/actions/menuActions';

// Helpers
import { getEgmBg } from '../../utils/helper';

const Aristocrat = React.lazy(() => import('../../components/game-play/Aristocrat/Aristocrat'));
const Aruze = React.lazy(() => import('../../components/game-play/Aruze/Aruze'));

const GamePlay = () => {
  // Ref
  const sdkRef = useRef();

  // Hooks
  // eslint-disable-next-line
  const { isMobile } = useRwd();

  // Router prop
  const navigate = useNavigate();

  // Init state
  const [isCashInOutClick, setIsCashInOutClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [playStatus, setPlayStatus] = useState('');

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
  const { online } = userData || {};
  const { online_id: onlineId, point } = online || {};

  const { data: aftFormData } = useSelector((state) => state.aftForm);
  const { aftType, currentAmount, selectChipType } = aftFormData || {};

  const { data: selectEgmData, currentBtnPress } = useSelector(
    (state) => state.selectEgm,
  );
  const { buttonList, ip, stream_url: url } = selectEgmData || {};

  const { currentMenu } = useSelector((state) => state.menu);

  let image;

  if (model && brandName) {
    image = getEgmBg({ brandName, model });
  }

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
    navigate('/');
    dispatch(clearButtonPressStatus());
    dispatch(clearCashInOutStatus());
    dispatch(clearSelectEgmData());
    dispatch(setCurrentMenu(''));
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
        content: `${text}成功`,
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

  // 視訊播放狀態
  useEffect(() => {
    Toast.clear();

    Toast.config({
      position: 'center',
      duration: 0,
    });

    if (playStatus === 'loading') {
      Toast.show({
        icon: 'loading',
        content: '遊戲視訊加载中…',
        duration: 1000 * 60,
      });
    }

    if (playStatus === 'wait') {
      Toast.show({
        icon: 'loading',
        content: '遊戲視訊等待中…',
      });
    }

    if (playStatus === 'error') {
      Toast.show({
        icon: 'fail',
        content: '無法獲取遊戲視訊',
        duration: 2000,
      });

      if (playStatus === 'stalled') {
        Toast.show({
          icon: 'fail',
          content: '遊戲視訊格式無法使用',
          duration: 2000,
        });
      }
    }
  }, [playStatus]);

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

      {/* Jackpot */}
      <Jackpot visible={currentMenu === 'jp'} />

      {/* 開洗分表單 */}
      <AftForm
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
        aftLoading={aftLoading}
        point={point}
      />

      {/* <div
        style={{
          height: '100vh',
          backgroundColor: 'red',
          // marginRight: currentMenu === 'jp' && !isMobile && '-30%',
          // transition: 'all 0.4s',
        }}
      > */}
      <div
        style={{
          height: '100%',
          width: '100%',
          marginRight: currentMenu === 'jp' && !isMobile && '-30%',
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
          />
        )}
      </div>
    </>
  );
};

export default GamePlay;
