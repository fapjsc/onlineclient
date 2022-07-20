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


  //console.log('expiredTime => ', expiredTimeSec, expiredTimeMin, expiredTime)

  const [timeState, timefunc ] = useTimer(59, 2, 0);
  const {second:sec, minute:min, showWindow: show} = timeState;
  const {setShowWindow: setShow, countDownTimer: Timer, setTimer: changeTime, ClearTimer} = timefunc;
  const [trigger, setTrigger] = useState(false)

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

  const isInWaitingList = () => {
    //當waitingList改變 以及狀態改變成booking 去計算 總預訂人數 以及自己的順位
    let waitingList, syn = '';

    console.log('start booking ')
    waitingList = egm?.waitingList || [];

    setTotalBooking(waitingList?.length || 0);
    for(let item=0; item < waitingList.length; item++) {
      if (waitingList[item].onlineId == onlineId){
        syn = item + 1;
      }
    }
    console.log('egm membere => ', egm?.member)
    if(syn === 1 && Object.keys(egm?.member).length === 0 && !egm?.hasCredit) {
      syn = 0
    }
    
    setSynPosition(syn === '' ? '' : syn);
    
  }

  const calcExpireTime = () => {
    console.log('waitingExpireTime => ', egm.waitingExpiredTime)
    const expiredTime = (egm?.waitingExpiredTime - new Date()) > 0 ? (egm?.waitingExpiredTime - new Date()) / 1000 : 0;
    console.log('倒數計時 => ', expiredTime)
    const expiredTimeSec = Math.round(expiredTime % 60);
    const expiredTimeMin = parseInt(expiredTime / 60)
    console.log('倒數計時分秒=> ', expiredTimeMin ,expiredTimeSec)
    changeTime(expiredTimeSec, expiredTimeMin)
    setTrigger(true)
  }

  const isSomeOnePlaying = () => {
    try{
      if(!egm.member) return
      if ((Object.keys(egm?.member).length > 0)
        || egm?.hasCredit 
        ||egm?.waitingList?.length > 0)
        {
        //判斷是否有人在遊戲中
        if (status !== 'someonePlaying' && status !== 'booking'){
          setStatus('someonePlaying');
        }
        else {
          isInWaitingList()
        }
        return true;
      }
      else{
        setStatus('origin')
        return false;
      }
    } catch{
      
    }

  };

  const btnOnClick = async() => {
    setSynPosition('')
    setTotalBooking('')
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
    //每當
    if(status === 'origin' || status === 'someonePlaying') {
      isSomeOnePlaying()
    }
    //get booking List when egm update every time
  }, [egm]);

  useEffect(() => {
    //當在loading的時候就 如果被按下去的egmid是自己 狀態就設為connect 
    //console.log(egmIdClicked ,egmId)
    if (selectEgmLoading && egmIdClicked === egmId){
      setStatus('connect')
    }else{
      isSomeOnePlaying()
      setEgmIdClicked(null)
    }
  }, [selectEgmLoading])

  useEffect(() => {
    //當狀態改變 以及 waitingList 改變 去找找是否在waitingList
    if(status === 'booking' || status === 'someonePlaying' || status === 'start') {
      isInWaitingList();
    }

  }, [egm?.waitingList, status]);

  useEffect(async() => {
    //當順位為零的時候就開始遊戲
    if(synPosition === 0){
      calcExpireTime()
      setStatus('start')
    }
    else if(synPosition >0) {
      //如果有在waitinList 裏面
      setStatus('booking')
    }
    else if(synPosition === '') {
      //找不到人在waiting List 裏面
      isSomeOnePlaying()
      setSynPosition(-1)
      isSomeOnePlaying()
    }
    console.log('預約人數',synPosition,totalBooking)
  }, [synPosition, totalBooking])

  useEffect(() => {
    calcExpireTime();
  }, [egm?.waitingExpiredTime, status])

  useEffect(() => {
    if(sec === 0 && min ===0) {
      //把人踢掉
        isSomeOnePlaying()
    }
    else if(trigger && status === 'start'){
      Timer()
      setTrigger(false)
    }
  }, [sec, min, trigger, status])

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