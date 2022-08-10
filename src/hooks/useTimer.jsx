/* eslint-disable */
import { useEffect, useState, useRef } from 'react';

function useTimer(propSec, propMin, propTimeOutCount) {
  const [show, setShow] = useState(false);
  const [countDown, setCountDown] = useState({
    sec: 30,
    min: 0,
  });
  const timeIntervalTimer = useRef(0);
  const timeOutTimer = useRef(0);

  const changeTime = (secs, mins) => {
    setCountDown({sec: secs, min: mins});
  };

  const Clear = () => {
    //console.log('reset Timer');
    if (timeIntervalTimer.current !== 0) {
      clearInterval(timeIntervalTimer.current);
      //console.log('清除timerInterval id => ', timeIntervalTimer.current)
    }
    if (timeOutTimer.current !== 0) {
      clearTimeout(timeOutTimer.current);
      //console.log('清除timerOut id => ', timeOutTimer.current)
    }
    timeIntervalTimer.current = 0;
    timeOutTimer.current = 0;
    console.log('clear');
  };

  const Timer = (timeOut, sec, min) => {
    //console.log('timer id => ', timeIntervalTimer.current,timeOutTimer.current)
    //await Clear();
    clearInterval(timeIntervalTimer.current)
    clearTimeout(timeOutTimer.current)
    console.log(`reset success 等待${timeOut || propTimeOutCount}秒 重新計時`);
    changeTime(sec, min)
    timeOutTimer.current = setTimeout(() => {
      timeIntervalTimer.current = setInterval(() => {
        setCountDown((prev) => {
          if (prev.sec <= 0 && prev.min <= 0) {
            clearInterval(timeIntervalTimer.current);
            return{
              sec: 0,
              min: 0,
            }
          } else if (prev.sec <= 0) {
            return {
              sec: 59,
              min: prev.min - 1,
            };
          } else {
            return {
              sec: prev.sec - 1,
              min: prev.min,
            };
          }
        })

      }, 1000);
      setShow(true);
    }, (timeOut || propTimeOutCount) * 1000);
  };

  useEffect(() => {
    changeTime(propSec, propMin);
    console.log('reset_timer');
    Clear()
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    //console.log(`${min}分${sec}秒`);
    if (countDown.sec === 0 && countDown.min === 0) {
      Clear();
      console.log('計時器停止');
    }
    // eslint-disable-next-line
  }, [ countDown.sec, countDown.min]);

  return [{
    second: countDown.sec, minute: countDown.min, showWindow: show,
  }, { countDownTimer: Timer, setShowWindow: setShow, ClearTimer: Clear, setTimer: changeTime}];
}
export default useTimer;
