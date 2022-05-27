import React, { useEffect } from 'react';

// Antd
import { Toast, Button } from 'antd-mobile';

// Redux
import { useDispatch } from 'react-redux';

// Router props
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import useHttp from '../hooks/useHttp';

// Axios
import { axiosFetch } from '../config/axiosConfig';

// Actions
import { autoLogin } from '../store/actions/userActions';

// APis
import { agentServer, authApi } from '../apis';

const landing = async ({ playerAccount, hash }) => {
  let endPoint;

  if (process.env.REACT_APP_HOST_NAME === 'WHEEL') {
    endPoint = authApi.landing15Wheel;
  } else {
    endPoint = authApi.landing;
  }

  const url = `${agentServer.api}/${endPoint}`;
  const response = await axiosFetch.post(url, {
    playerAccount,
    hash,
  });
  const { data } = response || {};
  return data;
};

const LandingPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const playerAccount = params.get('playerAccount');
  const hash = params.get('hash');

  // Router
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();

  // Hooks
  const {
    sendRequest,
    data: landingData,
    error: landingError,
    status: landingStatus,
  } = useHttp(landing);

  // 加密完成後呼叫landing api
  useEffect(() => {
    sendRequest({ playerAccount, hash });
  }, [playerAccount, hash, sendRequest]);

  // Landing 狀態
  useEffect(() => {
    if (landingStatus !== 'pending' && !landingError) {
      Toast.clear();
      return;
    }

    if (landingStatus === 'pending') {
      Toast.show({
        icon: 'loading',
        content: '驗證中…',
        duration: 0,
        key: 'loading',
      });
    }

    if (landingError) {
      Toast.show({
        icon: 'fail',
        content: '驗證失敗',
      });
    }
  }, [landingError, landingStatus]);

  useEffect(() => {
    if (!landingData) return;

    const { result } = landingData || {};
    dispatch(autoLogin(result));
    navigate('/');
  }, [landingData, dispatch, navigate]);

  return (
    <div style={{ alignItems: 'center', display: 'flex' }}>
      {landingError && (
        <Button onClick={() => alert('return')} color="primary">
          返回
        </Button>
      )}
    </div>
  );
};

export default LandingPage;
