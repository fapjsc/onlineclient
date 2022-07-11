/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SlotList.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingList } from '../../store/actions/egmActions';
import { useRef } from 'react';
import Countdown from 'react-countdown';

const statusText = {
  connect: {
    btnText: '連線中',
    windowText: '',
  },
  someonePlaying: {
    btnText: '我要預約',
    windowText: '遊戲中',
  },
  start: {
    btnText: '開始遊戲',
    windowText: <>
      可以開始遊戲<br/> 
      請在時間內完成開分<br/>
    </>,
  },
  booking: {
    btnText: '我的順位',
    windowText: <>
      已預約機台<br/> 
      預約人數<br/>
    </>,
  },
  origin: {
    btnText: '',
    windowText: '',
  },
};
const statusStyle = {
  connect: {
    coverBorderColor: '6px solid #fff',
    btnStyles: {
      border: '0px solid #fff',
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#FFD700',
    },
    textColor: '#00f',
  },
  someonePlaying: {
    coverBorderColor: '6px solid #f00',
    btnStyles: {
      border: '1px solid white',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: '#f00',
  },
  start: {
    coverBorderColor: '6px solid #90EE90',
    btnStyles: {
      border: '1px solid #90EE90',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: '#90EE90',
  },
  booking: {
    coverBorderColor: '6px solid #B5B5B5',
    btnStyles: {
      border: '0px solid #B5B5B5',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: 'white',
  },
  origin: {
    coverBorderColor: '6px solid #fff',
    btnStyles: {
      border: '0px solid white',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
    },
    textColor: '#f00',
  },
};
const renderer = ({
  formatted: { minutes, seconds }, completed,
}) => {
  if (completed) {
    return <></>;
  }

  return <>{`${minutes}:${seconds}`}</>;
};
const Cover = ({btnAction, btnActionParams, bonusImg, egm}) => {
  const [status, setStatus] = useState('origin')
  const [synPosition, setSynPosition] = useState('')
  const [totalBooking, SetTotalBooking] = useState('')


  const dispatch = useDispatch();
  const timeOutRef = useRef();

  const {
    data: bookingList
  } = useSelector((state) => state.bookingList)

  const {
    data: userData
  } = useSelector((state) => state.user)

  const { online_id: onlineId } = userData || {};
  const { id: egmId } = egm || {};

  const changeBookingList = async () => {
    dispatch(getBookingList(egmId, onlineId))
  }


  const isSomeOnePlaying = () => {
    if ((egm?.member && Object.keys(egm.member)?.length > 0) 
      || egm?.hasCredit 
      ||egm?.waitingList.length > 0) 
      {
      //判斷是否有人在遊戲中
      if (status !== 'someonePlaying'){
        setStatus('someonePlaying');
      }
      return true;
    }
    else{
      setStatus('origin')
      return false;
    }
  };

  const btnOnClick = async() => {
    console.log('egmId OnlineId',egmId,onlineId)
    setStatus('connect')
    if(status == 'origin') {
      btnAction(btnActionParams)
    }
    else if(status === 'someonePlaying') {
      //do switch booking and check booking list
      await changeBookingList()
      setStatus('booking')
    }
    else if(status == 'start') {
      btnAction(btnActionParams)
    }
  }

  useEffect(()=> {
    isSomeOnePlaying()
    //get booking List when egm update every time
  }, [egm]);

  useEffect(() => {
    if(status === 'booking'){
    }
  }, [egm?.waitingList])

  return (
    <div
      onClick={() => status === 'origin'&&(btnOnClick())}
      className={styles.cover}
      style={{
        border: statusStyle[status].coverBorderColor,
      }}
    >
      <div className={styles.exclamationMark} />
      <div
      style={{
          flex: 1,
          display: 'flex',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: statusStyle[status].textColor,
        }}
      >
        {statusText[status].windowText}
        {status === 'booking'
          ? `${totalBooking}`
          : status === 'start'
            &&(
              <Countdown
                date={Date.now() + 120000}
                intervalDelay={0}
                renderer={renderer}
                onComplete={() => setStatus('someonePlaying')}
              />
                )
        }
      </div>
      {bonusImg && <div className={styles.bonusImg} />}
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ width: '50%', color: 'white' }}>{egm.name === egm.model ? egm.name :egm.name + egm.model}</div>
        {status === 'start' || status === 'someonePlaying' ? (
          <button
            onClick={btnOnClick}
            type="button"
            style={{
              ...statusStyle[status].btnStyles,
              width: '50%',
              height: '30px',
            }}
          >
            {synPosition
              ? `${statusText[status].btnText}${synPosition}`
              : `${statusText[status].btnText}`}
          </button>
        ) : (
          <div
            className={status === 'connect' ? styles.load : styles.notLoad}
            style={{
              ...statusStyle[status].btnStyles,
              width: '50%',
              height: '30px',
            }}
          >
            {synPosition
              ? `${statusText[status].btnText}${synPosition}`
              : `${statusText[status].btnText}`}
          </div>
        )}
      </div>
    </div>
  );
}

Cover.propTypes = {
  egm: PropTypes.object.isRequired,
  btnAction: PropTypes.func.isRequired,
  btnActionParams: PropTypes.any.isRequired,
  bonusImg: PropTypes.bool.isRequired,
};
export default Cover;