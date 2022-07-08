import React, { useEffect, useRef } from 'react';

// Antd
import { Image, Dialog, Toast } from 'antd-mobile';

// Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// actions
import {
  getEgmList,
  selectEgm,
  getBrandList,
} from '../../store/actions/egmActions';

import { egmActionTypes } from '../../store/types';

// Helper
// eslint-disable-next-line
import { getEgmImage, getBrandImage } from '../../utils/helper';

import loadingImg from '../../assets/slot-list/loading.png';
import notFoundImg from '../../assets/slot-list/找不到圖片.png';

// Styles
import styles from './SlotList.module.scss';
import Cover from './cover';

const SlotList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    // eslint-disable-next-line
    data: egmListData,
    error: egmListError,
    isLoading: egmListLoading,
  } = useSelector((state) => state.egmList);

  const {
    data: brandListData,
    error: brandListError,
    // eslint-disable-next-line
    isLoading: brandListLoading,
  } = useSelector((state) => state.brand);

  const {
    data: selectEgmDta,
    isLoading: selectEgmLoading,
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const { id: egmID } = selectEgmDta || {};

  // const { isPlaying } = useSelector((state) => state.egmStatus);
  // eslint-disable-next-line
  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };

  // console.log(egmListData, 'slot list');
  // const randomBoolean = () => Math.random() < 0.5;

  const egmListLoadingRef = useRef();
  const selectEgmLoadingRef = useRef();

  useEffect(() => {
    dispatch(getEgmList());
    dispatch(getBrandList());
  }, [dispatch]);

  // 有egmID 代表select egm 成功
  useEffect(() => {
    if (egmID) {
      navigate('/game-play', { replace: true });
      window.history.pushState(null, null, null);
    }
  }, [egmID, navigate]);

  // Get brand error
  useEffect(() => {
    if (brandListError) {
      Dialog.alert({
        content: brandListError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onConfirm: () => {
          dispatch({ type: egmActionTypes.CLEAR_BRAND_LIST_STATUS });
        },
      });
    }
  }, [brandListError, dispatch]);

  // Get egm list error
  useEffect(() => {
    if (egmListError) {
      Dialog.alert({
        content: egmListError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onConfirm: () => {
          dispatch({ type: egmActionTypes.CLEAR_EGM_LIST_STATUS });
        },
      });
    }
  }, [egmListError, dispatch, selectEgmError]);

  // Select egm error
  useEffect(() => {
    if (selectEgmError) {
      Dialog.alert({
        content: selectEgmError,
        closeOnMaskClick: true,
        confirmText: '確定',
        onConfirm: () => {
          dispatch({ type: egmActionTypes.CLEAR_SELECT_EGM_DATA });
        },
      });
    }
  }, [selectEgmError, dispatch]);

  useEffect(() => {
    if (egmListLoading) {
      egmListLoadingRef.current = Toast.show({
        icon: 'loading',
        content: '遊戲加载中!',
        position: 'center',
      });
    }

    return () => {
      egmListLoadingRef.current?.close();
    };
  }, [egmListLoading]);

  useEffect(() => {
    if (selectEgmLoading) {
      selectEgmLoadingRef.current = Toast.show({
        icon: 'loading',
        content: '請稍等…',
        position: 'center',
        duration: 0,
      });
    }

    return () => {
      selectEgmLoadingRef.current?.close();
    };
  }, [selectEgmLoading]);

  return (
    <section className={styles.container}>
      <div className={styles['brand-box']}>
        {brandListData
          && Object.keys(brandListData)?.map((brand) => (
            <div key={brand}>
              <Image
                lazy
                src={getBrandImage(brand)}
                style={{ height: '100%', width: '100%' }}
                fallback={
                  <Image
                    lazy
                    style={{ height: '100%', width: '100%' }}
                    src={notFoundImg}
                  />
                }
                placeholder={
                  <Image
                    lazy
                    style={{ height: '100%', width: '100%' }}
                    src={loadingImg}
                  />
                }
              />
            </div>
          ))}
      </div>
      <div className={styles['slot-box']}>
        {egmListData?.map((egm) => (

          <div
            key={egm.id}
            //onClick={() => selectEgmHandler(egm.id)}
            role="presentation"
            className={styles['slot-btn']}
          >

            <Cover
              egm={egm}
              gameName="鑽石"
              bonusImg
              btnAction={selectEgmHandler}
              btnActionParams={egm.id}
            />

            <Image
              src={getEgmImage({
                model: egm.model,
                brandName: egm.brand_name,
              })}
              alt="Egm"
              style={{ height: '100%' }}
              lazy
              fallback={
                <Image
                  style={{ height: '100%', width: '100%' }}
                  src={notFoundImg}
                  lazy
                />
              }
              placeholder={
                <Image
                  lazy
                  style={{ height: '100%', width: '100%' }}
                  src={loadingImg}
                />
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlotList;
