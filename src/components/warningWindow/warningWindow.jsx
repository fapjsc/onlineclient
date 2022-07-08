/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './warningWindow.module.scss';

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
class WarningWindow extends Component {
  constructor(props) {
    super(props);
    this.timeOutTimer = 0;
    this.timeIntervalTimer = 0;
    this.state = {
      sec: 30,
      min: 0,
      show: false,
      status: 'origin',
    };
    this.btnAction = this.btnAction.bind(this);
    this.Timer = this.Timer.bind(this);
    this.Clear = this.Clear.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      time, status,
    } = this.props;

    console.log('Props更新=>', this.props);
    if (prevProps.time !== time) {
      //如果是新的props.time
      this.Timer();
    }
    if (prevState.status !== status) {
      this.Timer();
      this.changeStatus(status);
    }
    if (prevState.sec === 0 && prevState.min === 0 && prevProps.status === status) {
      this.changeStatus('timeOut');
    }
  }

  changeStatus(status) {
    this.setState({ status: status });
  }

  Clear() {
    console.log('reset Timer');
    if (this.timeIntervalTimer !== 0) {
      clearInterval(this.timeIntervalTimer);
      this.setState({ sec: 30, min: 0 });
    }
    if (this.timeOutTimer !== 0) {
      clearTimeout(this.timeOutTimer);
      this.setState({ sec: 30, min: 0 });
    }
  }

  Timer() {
    const {
      min, sec, status,
    } = this.state;
    console.log(`timer Start${min}分${sec}秒`);
    this.Clear();
    if (status === 'timeInterval') {
      console.log('reset success 等待五秒 重新計時');
      this.timeOutTimer = setTimeout(() => {
        this.setState({ show: true });
        this.timeIntervalTimer = setInterval(() => {
          if (sec <= 0 && min <= 0) {
            clearInterval(this.timeIntervalTimer);
          } else if (sec <= 0) {
            this.setState({ min: min - 1 });
            this.setState({ sec: 59 });
          } else {
            this.setState({ sec: sec - 1 });
          }
        }, 1000);
      }, 5000);
    }
  }

  btnAction() {
    const {
      status, btnAction,
    } = this.props;
    if (statusText[status].btnText === '返回大廳' || statusText[status].windowText === '請登入會員') {
      btnAction();
      this.setState({ show: false });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    const {
      show, status, min, sec,
    } = this.state;

    return (
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
                    ? <span>
                      {
                        `${min < 10 ? `0${ min}` : min} : ${sec < 10 ? `0${ sec}` : sec}`
                      }
                    </span>
                    : <></>
                }
              </div>
              <div role="button" style={{ height: '20%' }} onClick={this.btnAction}>
                <div>{statusText[status].btnText}</div>
              </div>
            </div>
            : <div className={styles.positionCenter}>
              <div className={styles.warningwindow1}>
                <div role="button" onClick={() => this.setState({ show: false })}></div>
                {/*this is corssX*/}
                <div style={{ height: '20%', alignItems: 'center' }}>{statusText[status].titleText}</div>
                <div style={{ height: '60%', lineHeight: '40px' }}>{statusText[status].windowText}</div>
                {
                  this.status === 'systemMaintenance'
                    ? <></>
                    : <button 
                      style={{height: '20%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={this.btnAction}
                    >
                      {statusText[this.state.status].btnText}
                      </button>
                }
              </div>
            </div>
        }
      </div>

    );
  }
}

WarningWindow.defaultProps = {
  btnAction: () => {},
  time: '',
};

WarningWindow.propTypes = {
  status: PropTypes.string.isRequired,
  btuAction: PropTypes.func,
  time: PropTypes.string,
};
export default WarningWindow;
