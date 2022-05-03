import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Actions
import {
  clearCashInOutStatus,
  clearButtonPressStatus,
  clearSelectEgmData,
} from '../store/actions/egmActions';

import { setCurrentMenu } from '../store/actions/menuActions';

const useExitGame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exitGameHandler = useCallback(
    (sdkRef) => {
      sdkRef?.current?.close();
      navigate('/');
      dispatch(clearButtonPressStatus());
      dispatch(clearCashInOutStatus());
      dispatch(clearSelectEgmData());
      dispatch(setCurrentMenu(''));
    },
    [dispatch, navigate],
  );

  return {
    exitGameHandler,
  };
};

export default useExitGame;
