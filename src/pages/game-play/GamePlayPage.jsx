import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Aristocrat from '../../components/game-play/Aristocrat/Aristocrat';

const GamePlay = () => {
  const { error: egmButtonPressError } = useSelector(
    (state) => state.egmButtonPress,
  );
  console.log('game play');

  useEffect(() => {
    if (egmButtonPressError) {
      alert(egmButtonPressError);
    }
  }, [egmButtonPressError]);

  return <Aristocrat />;
};

export default GamePlay;
