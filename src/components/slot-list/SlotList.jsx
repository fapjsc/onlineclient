import React, { useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

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

  const { data: egmListData, error: egmListError } = useSelector(
    (state) => state.egmList,
  );
  const { data: brandListData } = useSelector((state) => state.brand);

  console.log(egmListError);

  const { data: selectEgmDta } = useSelector((state) => state.selectEgm);
  const { id: egmID } = selectEgmDta || {};

  useEffect(() => {
    dispatch(getEgmList());
    dispatch(getBrandList());
  }, [dispatch]);

  const selectEgmHandler = (id) => {
    dispatch(selectEgm(id));
  };

  useEffect(() => {
    if (egmID) {
      navigate('/game-play');
    }
  }, [egmID, navigate]);

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
          />
        ))}
      </div>
    </section>
  );
};

export default SlotList;
