import React, { useEffect } from 'react';

// Antd
import { Toast, Button } from 'antd-mobile';

// Redux
// eslint-disable-next-line
import { useDispatch, useSelector } from 'react-redux';

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

const landing = async (session) => {
  const url = `${agentServer.api}/${authApi.landing}`;
  const response = await axiosFetch.post(url, {
    data: session,
  });
  const { data } = response || {};
  return data;
};

const LandingPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const session = params.get('session');

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
    sendRequest(session);
  }, [session, sendRequest]);

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
