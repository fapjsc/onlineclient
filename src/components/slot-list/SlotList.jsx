import React, { useEffect } from 'react';

// Router
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// actions
import { getEgmList, selectEgm } from '../../store/actions/egmActions';

import styles from './SlotList.module.scss';

const SlotList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useSelector((state) => state.egmList);
  const { data: selectEgmDta } = useSelector((state) => state.selectEgm);
  const { id: egmID } = selectEgmDta || {};

  console.log(egmID);

  useEffect(() => {
    dispatch(getEgmList());
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
      {/* <div className={styles['brand-box']}>
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
        <div className={styles.brand} />
      </div> */}

      <div className={styles['slot-box']}>
        {data?.map((egm) => (
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
