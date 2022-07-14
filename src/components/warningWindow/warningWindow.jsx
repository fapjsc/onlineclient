/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './warningWindow.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useTimer from '../../hooks/useTimer';
import _ from 'lodash';

const statusText = {
  timeInterval: {
    windowText: '機器沒有啟動遊戲，即將自動洗分',
    btnText: '繼續遊戲',
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
const WarningWindow = ({propStatus, btnAction}) => {
  const [timeState, timefunc ] = useTimer(30, 0, 270);
  const [status, setStatus] = useState(propStatus);
  const {second:sec, minute:min, showWindow: show} = timeState;
  const {setShowWindow: setShow, countDownTimer: Timer} = timefunc;

  const {
    data: selectEgmData,
  } = useSelector((state) => state.selectEgm);
  const { id: egmID } = !selectEgmData ? { id: 0 } : selectEgmData;
  let {
    // eslint-disable-next-line
    data: egmListData,
  } = useSelector((state) => state.egmList);



  const egmListDataReduce = () => egmListData.filter((item, index) => {

    let reduceArr = Object.keys(item).reduce((all, currKey) => {
      if(currKey === 'id' || currKey === 'playerPressTime') {
        return [...all, currKey]
      }
      return all
    }, [])

    if (reduceArr.length === 2) {
      if (item.id === egmID) return item;
    }
  })


  let [{ playerPressTime }] = (!egmListData) ? [playerPressTimeDefault] : (egmListDataReduce().length > 0 ? egmListDataReduce()  : [playerPressTimeDefault])
  /*
  egmListData?.map((item,index) => {
    if(!egmID || !item ) return playerPressTimeDefault;
    if (item?.id === egmID) {
      console.log(item?.id, egmID ,'equal')
      let a = item?.playerPressTime || playerPressTimeDefault;
      return a == playerPressTimeDefault ? a :item;
    }
  }) || [playerPressTimeDefault];
  */

  const btnOnClick = () => {
    setShow(false)
    console.log('onclick')
    if (statusText[status].btnText === '返回大廳' || statusText[status].windowText === '請登入會員') {
      console.log('回到主頁')
      btnAction()
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    //重egm List 更新playerPressTime

    console.log('更新 playerPressTime => ', playerPressTime);
    console.log(`selectEgmData: ${selectEgmData}`);
    // eslint-disable-next-line
    Timer()
  }, [playerPressTime]);

  useEffect(() => {
    if (sec === 0 && min === 0){
      setStatus('timeOut')
    }
  }, [min, sec])

  return(
    <div className={styles.mask} style={{ display: show ? 'flex' : 'none' }}>
      {
        status === 'timeInterval' || status === 'timeOut'
          ? <div className={styles.warningwindow2}>
              <div style={{ height: '20%' }}>{statusText[status].titleText}</div>
              <div style={{ height: '60%' }}>
                {statusText[status].windowText}
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
                <div>{statusText[status].btnText}</div>
              </div>
            </div>
          : <div className={styles.positionCenter}>
            <div className={styles.warningwindow1}>
              <div role="button" onClick={() => setShow(false)}></div>
              {/*this is corssX*/}
              <div style={{ height: '20%', alignItems: 'center' }}>{statusText[status].titleText}</div>
              <div style={{ height: '60%', lineHeight: '40px' }}>{statusText[status].windowText}</div>
              {
                status !== 'systemMaintenance' &&(
                  <button 
                    style={{height: '20%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={btnOnClick}
                  >
                    {statusText[status].btnText}
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
  btuAction: PropTypes.func.isRequired,
};
export default WarningWindow;
