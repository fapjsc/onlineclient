import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuth = () => {
  const { data: userData } = useSelector((state) => state.user);
  const { data: selectEgmData } = useSelector((state) => state.selectEgm);

  const [isAuth, setIsAuth] = useState(!!userData);
  const [isSelectEgm, setIsSelectEgm] = useState(!!selectEgmData);

  useEffect(() => {
    if (userData) setIsAuth(true);

    if (!userData) setIsAuth(false);
  }, [userData]);

  useEffect(() => {
    if (selectEgmData) setIsSelectEgm(true);
    if (!selectEgmData) setIsSelectEgm(false);
  }, [selectEgmData]);

  return {
    isAuth,
    isSelectEgm,
  };
};

export default useAuth;
