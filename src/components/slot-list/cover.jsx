import React, { Component } from 'react';
import styles from './SlotList.module.scss';

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
    windowText: '可以開始遊戲 請在時間內完成開分',
  },
  booking: {
    btnText: '我的順位',
    windowText: '已預約機台 預約人數',
  },
  origin: {
    btnText: '',
    windowText: '',
  },
};
const statusStyle = {
  connect: {
    coverBorderColor: '6px solid #fff',
    btnstyles: {
      border: '0px solid #fff',
      backgroundColor: 'rgba(0,0,0,0)',
      color: '#FFD700',
    },
    textColor: '#00f',
  },
  someonePlaying: {
    coverBorderColor: '6px solid #f00',
    btnstyles: {
      border: '1px solid white',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: '#f00',
  },
  start: {
    coverBorderColor: '6px solid #90EE90',
    btnstyles: {
      border: '1px solid #90EE90',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: '#90EE90',
  },
  booking: {
    coverBorderColor: '6px solid #B5B5B5',
    btnstyles: {
      border: '0px solid #B5B5B5',
      backgroundColor: 'rgba(255,255,255,0.1)',
      color: 'white',
    },
    textColor: 'white',
  },
  origin: {
    coverBorderColor: '6px solid #fff',
    btnstyles: {
      border: '0px solid white',
      backgroundColor: 'rgba(0,0,0,0)',
      color: 'white',
    },
    textColor: '#f00',
  },
};
export default class Cover extends Component {
  constructor(props) {
    super(props);
    this.btnOnclick = this.btnOnclick.bind(this);
  }

  btnOnclick() {
    !this.props.btnAction
      ? null
      : this.props.btnAction(this.props.btnActionParams);
  }

  render() {
    console.log(this.props);

    return (
      <div
        className={styles.cover}
        style={{
          border: statusStyle[this.props.status].coverBorderColor,
        }}
      >

        <div className={styles.exclamationMark} />

        <div style={{
          flex: 1, display: 'flex', width: '90%', alignItems: 'center', color: statusStyle[this.props.status].textColor,
        }}
        >
          {
            statusText[this.props.status].windowText + (!this.props.totalBooking ? '' : ` : ${ this.props.totalBooking}`)
          }
        </div>
        {
          this.props.bonusImg
            ? <div className={styles.bonusImg} />
            : <></>

        }

        <div style={{
          display: 'flex',
          width: '100%',
          height: '40%',
          alignItems: 'center',
        }}
        >

          <div style={{ width: '50%', color: 'white' }}>
            {this.props.gameName}
          </div>
          {
            this.props.status == 'start' || this.props.status == 'someonePlaying'
              ? <button
                  onClick={this.btnOnclick}
                  style={{
                  ...statusStyle[this.props.status].btnstyles,
                  width: '50%',
                  height: '100%',
                }}
              >

                {
                  statusText[this.props.status].btnText
                                    + (!this.props.synPosition ? '' : ` : ${ this.props.synPosition}`)
                }
              </button>
              : <div
                  className={this.props.status == 'connect' ? styles.load : styles.notLoad}
                  style={{
                  ...statusStyle[this.props.status].btnstyles,
                  width: '50%',
                  height: '100%',
                }}
              >
                {
                  statusText[this.props.status].btnText
                                    + (!this.props.synPosition ? '' : ` : ${ this.props.synPosition}`)
                }
                </div>
          }
        </div>
      </div>
    );
  }
}
