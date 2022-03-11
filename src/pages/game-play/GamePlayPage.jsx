import React from 'react';
import { useSelector } from 'react-redux';

// Antd
import { Dialog } from 'antd-mobile';

import LoadingPage from '../LoadingPage';

const Aristocrat = React.lazy(() => import('../../components/game-play/Aristocrat/Aristocrat'));

const GamePlay = () => {
  console.log('gamePlay');
  const { data: SelectEgmData } = useSelector((state) => state.selectEgm);
  const { model, brand_name: brandName } = SelectEgmData || {};

  if (!model || !brandName) {
    return <LoadingPage />;
  }

  let image;

  if (model && brandName) {
    try {
      // eslint-disable-next-line
      image = require(`../../assets/game-machine/${brandName}/bg/${model}.webp`);
    } catch (error) {
      Dialog.alert({
        content: '無法獲取EGM圖片',
        closeOnMaskClick: true,
        confirmText: '確定',
      });
    }
  }

  return <Aristocrat model={model} image={image} />;
};

export default GamePlay;
