/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SlotList.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingList } from '../../store/actions/egmActions';
import { useRef } from 'react';
import useTimer from '../../hooks/useTimer';

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
const Cover = ({btnAction, btnActionParams, bonusImg, egm, selectEgmLoading}) => {
  const [status, setStatus] = useState('origin')
  const [synPosition, setSynPosition] = useState(-1);
  const [totalBooking, setTotalBooking] = useState(-1);


  const [timeState, timefunc ] = useTimer(59, 1, 0);
  const {second:sec, minute:min, showWindow: show} = timeState;
  const {setShowWindow: setShow, countDownTimer: Timer} = timefunc;

  const [egmIdClicked, setEgmIdClicked] = useState(null)

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
    if ((Object.keys(egm?.member).length > 0)
      || egm?.hasCredit 
      ||egm?.waitingList?.length > 0)
      {
      //判斷是否有人在遊戲中
      if (status !== 'someonePlaying' && status !== 'booking'){
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
    if(status == 'origin') {
      setEgmIdClicked(egmId)
      setStatus('connect')
      await btnAction(btnActionParams)
      isSomeOnePlaying()
    }
    else if(status === 'someonePlaying') {
      //do switch booking and check booking list
      await changeBookingList()
      setStatus('booking')
    }
    else if(status == 'start') {
      setEgmIdClicked(egmId)
      setStatus('connect')
      await btnAction(btnActionParams)
      isSomeOnePlaying()
    }
  }

  useEffect(()=> {
    if(status === 'origin' || status === 'someonePlaying') {
      isSomeOnePlaying()
    }
    //get booking List when egm update every time
  }, [egm]);

  useEffect(() => {
    //console.log(egmIdClicked ,egmId)
    if (selectEgmLoading && egmIdClicked === egmId){
      setStatus('connect')
    }else{
      isSomeOnePlaying()
      setEgmIdClicked(null)
    }
  }, [selectEgmLoading])

  useEffect(() => {
    let waitingList, syn;
    if(status === 'booking') {
      console.log('start booking ')
      waitingList = egm?.waitingList || [];

      setTotalBooking(waitingList?.length || 0);
      for(let item=0; item < waitingList.length; item++) {
        if (waitingList[item].onlineId == onlineId){
          syn = item;
        }
      }
      setSynPosition(!syn ? 0 : syn);
    }
    else if(status === 'someonePlaying'){
      setSynPosition('')
      setTotalBooking('000')
    }
  }, [egm?.waitingList, status]);

  useEffect(() => {
    if(synPosition === 0){
      Timer()
      setStatus('start')
    }
    console.log('預約人數',synPosition,totalBooking)
  }, [synPosition, totalBooking])

  useEffect(() => {
    if(sec === 0 && min ===0) {
      //把人踢掉
      setTimeout(() => {
        isSomeOnePlaying()
      }, 2000);
    }
  }, [sec, min])

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
              (min >= 10 ? `${min}` : `0${min}`)
              +' : '+
              (sec >= 10 ? `${sec}` : `0${sec}`)
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
            {status === 'booking'
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
            {status === 'booking'
              ? `${statusText[status].btnText}${synPosition}`
              : `${statusText[status].btnText}`}
          </div>
        )}
      </div>
    </div>
  );
}

Cover.propTypes = {
  selectEgmLoading: PropTypes.bool.isRequired,
  egm: PropTypes.object.isRequired,
  btnAction: PropTypes.func.isRequired,
  btnActionParams: PropTypes.any.isRequired,
  bonusImg: PropTypes.bool.isRequired,
};
export default Cover;