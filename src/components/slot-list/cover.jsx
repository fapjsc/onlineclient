import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
export default class Cover extends Component {
  constructor(props) {
    super(props);
    this.btnOnclick = this.btnOnclick.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.state = {
      status: 'start',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      egm,
    } = this.props;
    if (prevState.status !== 'someonePlaying') {
      this.changeStatus(egm);
    }
  }

  changeStatus(egm) {
    if ((egm?.member && Object.keys(egm.member)?.length > 0) || egm?.hasCredit) {
      //判斷是否有人在遊戲中
      this.setState({ status: 'someonePlaying' });
    }
  }

  btnOnclick() {
    const { btnAction, btnActionParams } = this.props;
    if (!btnAction) return;
    btnAction(btnActionParams);
  }

  render() {
    const {
      totalBooking, bonusImg, gameName, synPosition,
    } = this.props;
    const {
      status,
    } = this.state;
    return (
      <div
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
            width: '40%',
            alignItems: 'center',
            color: statusStyle[status].textColor,
          }}
        >
          {totalBooking
            ? `${statusText[status].windowText}${totalBooking}`
            : `${statusText[status].windowText}`}
        </div>
        {bonusImg && <div className={styles.bonusImg} />}

        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '50%', color: 'white' }}>{gameName}</div>
          {status === 'start' || status === 'someonePlaying' ? (
            <button
              onClick={this.btnOnclick}
              type="button"
              style={{
                ...statusStyle[status].btnStyles,
                width: '50%',
                height: '50px',
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
                height: '50px',
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
}

Cover.propTypes = {
  egm: PropTypes.objectOf.isRequired,
  btnAction: PropTypes.func.isRequired,
  btnActionParams: PropTypes.string.isRequired,
  bonusImg: PropTypes.bool.isRequired,
  gameName: PropTypes.string.isRequired,
  synPosition: PropTypes.string.isRequired,
  totalBooking: PropTypes.number.isRequired,
};
