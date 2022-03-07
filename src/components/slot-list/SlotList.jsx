import React, { useEffect } from 'react';

// Antd
import { Image, Dialog } from 'antd-mobile';

// Router
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import koiImage from '../../assets/button/slot-list/Aristocrat/btn-koi.png';

// actions
import {
  getEgmList,
  selectEgm,
  getBrandList,
} from '../../store/actions/egmActions';

// Styles
import styles from './SlotList.module.scss';

const SlotList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // eslint-disable-next-line
  const { data: egmListData, error: egmListError } = useSelector(
    (state) => state.egmList,
  );
  const { data: brandListData, error: brandListError } = useSelector(
    (state) => state.brand,
  );

  const { data: selectEgmDta } = useSelector((state) => state.selectEgm);
  const { id: egmID } = selectEgmDta || {};

  // console.log(egmListData);

  useEffect(() => {
    dispatch(getEgmList());
    dispatch(getBrandList());
  }, [dispatch]);

  // eslint-disable-next-line
  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };

  useEffect(() => {
    if (egmID) {
      navigate('/game-play');
    }
  }, [egmID, navigate]);

  useEffect(() => {
    if (egmListError && brandListError) {
      Dialog.alert({
        content: '無法取得遊戲清單及廠牌清單',
        closeOnMaskClick: true,
        confirmText: '確定',
      });
    }

    if (!brandListError && egmListError) {
      Dialog.alert({
        content: '無法取得遊戲清單',
        closeOnMaskClick: true,
        confirmText: '確定',
      });
    }

    if (brandListError && !egmListError) {
      Dialog.alert({
        content: '無法取得廠牌清單',
        closeOnMaskClick: true,
        confirmText: '確定',
      });
    }
  }, [egmListError, brandListError]);

  return (
    <section className={styles.container}>
      <div className={styles['brand-box']}>
        {brandListData
          && Object.keys(brandListData).map((brand) => {
            let imgObj;
            try {
              //eslint-disable-next-line
              imgObj = require(`../../assets/brand/${brand}.png`);
            } catch (error) {
              console.log(error);
            }
            return (
              <div
                key={brand}
                className={styles.brand}
                style={{ backgroundImage: imgObj && `url(${imgObj})` }}
              >
                {!imgObj && <span>{brand}</span>}
              </div>
            );
          })}
      </div>

      <div className={styles['slot-box']}>
        {egmListData?.map((egm) => (
          <div
            key={egm.id}
            onClick={() => selectEgmHandler(egm.id)}
            role="presentation"
            className={styles['slot-btn']}
          >
            <Image src={koiImage} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SlotList;
