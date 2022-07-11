/* eslint-disable */
import { useEffect, useState, useRef } from 'react';

function useTimer(propSec, propMin, propTimeOutCount) {
  const [sec, setSec] = useState(30);
  const [show, setShow] = useState(false);
  const [min, setMin] = useState(0);
  const timeIntervalTimer = useRef(0);
  const timeOutTimer = useRef(0);

  const changeTime = (secs, mins) => {
    setSec(secs);
    setMin(mins);
  };

  const Clear = async () => {
    console.log('reset Timer');
    if (timeIntervalTimer.current !== 0) {
      console.log('clearInterval');
      clearInterval(timeIntervalTimer.current);
    }
    if (timeOutTimer.current !== 0) {
      console.log('clearTimeOut');
      clearTimeout(timeOutTimer.current);
    }
    timeIntervalTimer.current = 0;
    timeOutTimer.current = 0;
    console.log('clear');
  };

  const Timer = async () => {
    await Clear();
    changeTime(propSec, propMin);
    console.log(`reset success 等待${propTimeOutCount}秒 重新計時`);
    timeOutTimer.current = setTimeout(() => {
      timeIntervalTimer.current = setInterval(() => {
        if (sec <= 0 && min <= 0) {
          clearInterval(timeIntervalTimer);
        } else if (sec <= 0 && min > 0) {
          changeTime(59, min - 1);
        } else {
          setSec((prev) => (prev - 1));
        }
      }, 1000);
      setShow(true);
    }, propTimeOutCount * 1000);
  };

  useEffect(() => {
    changeTime(propSec, propMin);
    console.log('reset_timer');
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    console.log(`${min}分${sec}秒`);
    if (sec === 0 && min === 0) {
      Clear();
      console.log('計時器停止');
    }
    // eslint-disable-next-line
  }, [ sec, min]);

  return [{
    second: sec, minute: min, showWindow: show,
  }, { countDownTimer: Timer, setShowWindow: setShow, ClearTimer: Clear }];
}
export default useTimer;
