/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './WarningWindow.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useTimer from '../../hooks/useTimer';
import _ from 'lodash';
import { showWarningWindow } from '../../store/actions/warningAction';
import { store } from '../../store';

const statusText = {
  warning: {
    windowText: '',
    btnText: '確認',
    titleText: '警告',
  },
  timeInterval: {
    windowText: '機器沒有啟動遊戲，即將自動洗分',
    btnText: '繼續遊戲',
    titleText: '系統訊息',
  },
  wash: {
    windowText: '正在洗分中',
    btnText: '正在洗分中',
    titleText: '系統訊息',
  },
  timeOut: {
    windowText: <>
      待機過久，系統已自動洗分，
      <br />
      <span style={{ textAlign: 'center' }}>
        請重新選擇遊戲機
      </span>
    </>,
    btnText: '返回大廳',
    titleText: '系統訊息',
  },
  notLogin: {
    windowText: '請登入會員',
    btnText: '確定',
    titleText: '系統訊息',
  },
  someonePlaying: {
    windowText: '遊戲機已有玩家遊戲中,請選擇其他遊戲機',
    btnText: '確定',
    titleText: '系統訊息',
  },
  systemMaintenance: {
    windowText: <>
      親愛的玩家 :
      {' '}
      <br />
      平台將於本日上午七點開始進行例行性維護
      <br />
      請各位玩家停止遊戲並進行洗分
      <br />
      如有未洗分,五分鐘後平台將會自動洗分
      <br />
      如有不便之處,敬請見諒
    </>,
    btnText: '確定',
    titleText: '重要公告',
  },
  origin: {
    windowText: '',
    btnText: '',
    titleText: '',
  },
};
const playerPressTimeDefault = {playerPressTime: -1}
const autoLeaveEgmDefault = {
  start: false,
  done: false,
  member_id: ""
}

const WarningWindow = ({propStatus, btnAction, windowText, visible, btnText}) => {
  const [timeState, timefunc ] = useTimer(30, 0, 270);
  const [status, setStatus] = useState(propStatus);
  const {second:sec, minute:min, showWindow: show} = timeState;
  const {setShowWindow: setShow, countDownTimer: Timer, setTimer} = timefunc;

  const {
    data: selectEgmData,
  } = useSelector((state) => state.selectEgm);
  const { id: egmID } = !selectEgmData ? { id: 0 } : selectEgmData;
  let {
    // eslint-disable-next-line
    data: egmListData,
  } = useSelector((state) => state.egmList);

  const { data: userData } = useSelector((state) => state.user)

  let findEgmListData = egmListData?.find((item) => {
    if (item?.id === egmID) {
      return item;
    }
  });
  
  findEgmListData = !findEgmListData || typeof findEgmListData === 'undefined' ? {} : findEgmListData

  let { playerPressTime } = !egmListData && Object.keys(findEgmListData)?.length === 0 ? playerPressTimeDefault : findEgmListData
  const playerPressTimeOut = findEgmListData?.playerPressTimeOut || {}
  const { start: washStart, done: washDone, member_id: washMember } = findEgmListData?.autoLeaveEgm || autoLeaveEgmDefault

  const startTimer = () => {
    const date = playerPressTime === -1 ? 0 : (new Date() - new Date(playerPressTime)) / 1000
    console.log(`timeout of player press time =>  \n${new Date()}\n${new Date(playerPressTime)}\n${date}`)
    const timeOutSec = (playerPressTimeOut - 30000) / 1000
    Timer(timeOutSec, 30, 0)
  }

  const btnOnClick = () => {
    setShow(false)
    console.log('onclick')
    store.dispatch(showWarningWindow('off'));
    if (propStatus === 'timeInterval' ) {
      if (status === 'timeOut') {
        try {
          btnAction()
        } catch {
          //pass
        }
      } else {
        startTimer()
      }
    } else {
      try {
        btnAction()
      } catch {
        //pass
      }
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    //重egm List 更新playerPressTime

    if (status === 'timeOut' || status === 'timeInterval') {
      // console.log('更新 playerPressTime => ', playerPressTime);
      // console.log(`selectEgmData: ${selectEgmData}`);
      // eslint-disable-next-line
      startTimer()
    }
  }, [playerPressTime, playerPressTimeOut]);

  useEffect(() => {
    console.log('autoleave egm =>', washStart, washDone, washMember ,userData?.member_id)
    if (washDone) {
      setStatus('timeOut')
      setShow(true)
    } else if (sec === 0 && min === 0) {
      setShow(false)
    }
  }, [min, sec, washDone, washStart])

  useEffect(() => {
    setShow(visible)
  },[visible])

  useEffect(() => {
    setStatus(propStatus)
  }, [propStatus])

  return(
    <div className={styles.mask} style={{ display: show ? 'flex' : 'none' }}>
      {
        status === 'timeInterval' || status === 'timeOut' || status === 'warning' || status ==='wash'
          ? <div className={styles.warningwindow2}>
              <div style={{ height: '20%' }}>{statusText[status].titleText}</div>
              <div style={{ height: '60%' }}>
                <img 
                  src={
                    status === 'warning'
                    ? require('./warning.png')
                    : require('./clock.png')
                  }
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    marginBottom: '20px'
                  }}
                />
                
                {
                  windowText
                  ||
                  statusText[status].windowText
                }
                <br />
                {
                  status === 'timeInterval'
                    && (
                     (min >= 10 ? `${min}` : `0${min}`)
                     +' : '+
                     (sec >= 10 ? `${sec}` : `0${sec}`)
                    )
                }
              </div>
              <div role="button" style={{ height: '20%' }} onClick={btnOnClick}>
                <div>{btnText?.length ? btnText : statusText[status]?.btnText}</div>
              </div>
            </div>
          : <div className={styles['position-center']}>
            <div className={styles.warningwindow1}>
              <div role="button" onClick={() => setShow(false)}></div>
              {/*this is corssX*/}
              <div style={{ height: '20%', alignItems: 'center' }}>{statusText[status]?.titleText}</div>
              <div style={{ height: '60%', lineHeight: '40px' }}>{statusText[status]?.windowText}</div>
              {
                status !== 'systemMaintenance' &&(
                  <button 
                    style={{height: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={btnOnClick}
                  >
                    {statusText[status]?.btnText}
                    </button>
                )
              }
            </div>
          </div>
      }
    </div>
  )
}

WarningWindow.propTypes = {
  propStatus: PropTypes.string.isRequired,
  windowText: PropTypes.string,
  btuAction: PropTypes.func,
  visible: PropTypes.bool,
  btnText: PropTypes.string,
};
export default WarningWindow;
