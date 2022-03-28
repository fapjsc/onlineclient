import React, { useEffect, useState, useRef } from 'react';

// Antd
import { Dialog } from 'antd-mobile';

import { useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { CSSTransition } from 'react-transition-group';

// Components
import LoadingPage from '../LoadingPage';
import AftForm from '../../components/aft-form/AftForm';

// Actions
import {
  cashInOut,
  clearCashInOutStatus,
  clearButtonPressStatus,
  clearSelectEgmData,
} from '../../store/actions/egmActions';

// Helpers
import { getEgmBg } from '../../utils/helper';

const Aristocrat = React.lazy(() => import('../../components/game-play/Aristocrat/Aristocrat'));

const GamePlay = () => {
  const sdkRef = useRef();

  const navigate = useNavigate();

  const [isCashInOutClick, setIsCashInOutClick] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

      {/* 開洗分表單 */}
      <AftForm
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
        aftLoading={aftLoading}
        point={point}
      />

      <Aristocrat
        model={model}
        image={image}
        isCashInOutClick={isCashInOutClick}
        setIsCashInOutClick={setIsCashInOutClick}
        buttonList={buttonList}
        url={url}
        ip={ip}
        currentBtnPress={currentBtnPress}
        getSdkRef={getSdkRef}
        exitGameHandler={exitGameHandler}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  );
};

export default GamePlay;
