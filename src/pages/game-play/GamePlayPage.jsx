import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';

const Aristocrat = React.lazy(() => import('../../components/game-play/Aristocrat/Aristocrat'));

const GamePlay = () => {
  const { data: SelectEgmData } = useSelector((state) => state.selectEgm);
  const { name } = SelectEgmData || {};
  // console.log('game play => ', name);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Aristocrat gameName={name} />
    </Suspense>
  );
};

export default GamePlay;
