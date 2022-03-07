import React from 'react';
import { useSelector } from 'react-redux';
import Aristocrat from '../../components/game-play/Aristocrat/Aristocrat';

const GamePlay = () => {
  const { data: SelectEgmData } = useSelector((state) => state.selectEgm);
  const { name } = SelectEgmData || {};
  // console.log('game play => ', name);

  return <Aristocrat gameName={name} />;
};

export default GamePlay;
