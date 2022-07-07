import React, { Component } from 'react';
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

};
export default class WarningWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: !this.props.sec ? 0 : this.props.sec,
      min: !this.props.min ? 0 : this.props.min,
      show: true,
      status: this.props.status,

    };
    this.btnAction = this.btnAction.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    if (this.state.status == 'timeInterval') {
      const a = setInterval(() => {
        if (this.state.sec <= 0 && this.state.min <= 0) {
          clearInterval(a);
        } else if (this.state.sec <= 0) {
          this.setState({ min: this.state.min - 1 });
          this.setState({ sec: 59 });
        } else {
          this.setState({ sec: this.state.sec - 1 });
          console.log(this.state.sec - 1);
        }
      }, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    if (this.state.sec == 0 && this.state.min == 0 && prevProps.status == this.state.status) {
      this.setState({ status: 'timeOut' });
    }
  }

  btnAction() {
    if (statusText[this.props.status].btnText === '返回大廳' || statusText[this.props.status].windowText === '請登入會員') {
      this.props.btnAction();
      this.setState({ show: false });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    const a = new Date();
    console.log('prop', this.props.time);

    return (
      <div className={styles.mask} style={{ display: this.state.show ? 'flex' : 'none' }}>
        {
          this.state.status == 'timeInterval' || this.state.status === 'timeOut' ? <div className={styles.warningwindow2}>
            <div style={{ height: '20%' }}>{statusText[this.state.status].titleText}</div>
            <div style={{ height: '60%' }}>
              {statusText[this.state.status].windowText}
              <br />
              {
                this.state.status == 'timeInterval'
                  ? <span>
                    {
                        `${this.state.min < 10 ? `0${ this.state.min}` : this.state.min} : ${
											this.state.sec < 10 ? `0${ this.state.sec}` : this.state.sec}`
                    }
                  </span>
                  : <></>
              }
            </div>
            <div
              style={{ height: '20%' }}
              onClick={this.btnAction}
            >
              <div>{statusText[this.state.status].btnText}</div>
            </div>
          </div>
            :						<div className={styles.positionCenter}>
              <div className={styles.warningwindow1}>
                <div onClick={() => this.setState({ show: false })}><div /></div>
                {/*this is corssX*/}
                <div style={{ height: '20%', alignItems: 'center' }}>{statusText[this.state.status].titleText}</div>
                <div style={{ height: '60%', lineHeight: '40px' }}>{statusText[this.state.status].windowText}</div>
                {
                  this.status == 'systemMaintenance'
                    ? <></>
                    : <button
                        style={{
                        height: '20%',
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
