import React, { useEffect } from 'react';

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

const SlotList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: egmListData,
    error: egmListError,
    isLoading: egmListLoading,
  } = useSelector((state) => state.egmList);

  const {
    // eslint-disable-next-line
    data: brandListData,
    error: brandListError,
    isLoading: brandListLoading,
  } = useSelector((state) => state.brand);

  const {
    data: selectEgmDta,
    isLoading: selectEgmLoading,
    error: selectEgmError,
  } = useSelector((state) => state.selectEgm);

  const { id: egmID } = selectEgmDta || {};

  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };

  // const randomBoolean = () => Math.random() < 0.5;

  useEffect(() => {
    dispatch(getEgmList());
    dispatch(getBrandList());
  }, [dispatch]);

  // 有egmID 代表select egm 成功
  useEffect(() => {
    if (egmID) {
      navigate('/game-play');
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
    if (selectEgmLoading) {
      Toast.show({
        icon: 'loading',
        content: '加载中…',
        position: 'center',
      });
    }

    if (egmListLoading || brandListLoading) {
      Toast.show({
        icon: 'loading',
        content: '遊戲加载中…',
        position: 'center',
      });
    }

    return () => {
      Toast.clear();
    };
  }, [selectEgmLoading, egmListLoading, brandListLoading]);

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
            onClick={() => selectEgmHandler(egm.id)}
            role="presentation"
            className={styles['slot-btn']}
          >
            {/* {randomBoolean() && (
              <div
                role="presentation"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={styles['is-playing-cover']}
              >
                遊戲中...
              </div>
            )} */}

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
