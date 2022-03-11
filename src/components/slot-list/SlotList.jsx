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
import { getEgmImage, getBrandImage } from '../../utils/helper';

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
    Toast.clear();
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
  }, [selectEgmLoading, egmListLoading, brandListLoading]);

  return (
    <section className={styles.container}>
      <div className={styles['brand-box']}>
        {brandListData
          && Object.keys(brandListData)?.map((brand) => (
            <div
              key={brand}
              className={styles.brand}
              style={{ backgroundImage: getBrandImage(brand) }}
            >
              <Image src={getBrandImage(brand)} />
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
            <Image
              src={getEgmImage({
                model: egm.model,
                brandName: egm.brand_name,
              })}
              alt="Egm"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlotList;
