import React, {Component} from "react";
import styles from './SlotList.module.scss';
export default class IsPlayingCover extends Component{
    constructor(props) {
        super(props)
        this.coverStyles = this.coverStyles.bind(this)
        this.style = this.style.bind(this)
        this.btnOnclick = this.btnOnclick.bind(this)
        this.Text = this.Text.bind(this)
    }

    btnOnclick() {
        !this.props.btnAction
        ?null
        :this.props.btnAction(this.props.btnActionParams)
        
    }
    Text() {
        if(this.props.status == 'connect') {
            return {
                btnText: '連線中',
                windowText: ''
            }
                
            
        }
        else if(this.props.status == 'someonePlaying') {
            return {
                btnText: '我要預約',
                windowText: '遊戲中'
            }
        }
        else if(this.props.status== 'start') {
            return {
                btnText: '開始遊戲',
                windowText: '可以開始遊戲 請在時間內完成開分'
            }
        }
        else if(this.props.status == 'booking') {
            return {
                btnText: '我的順位',
                windowText: '已預約機台 預約人數'
            }
        }
        else{
            return {
                btnText: '',
                windowText: ''
            }
        }
    }

    coverStyles(coverBorderColor, btnstyles,textColor) {
        //coverBorderColor => 最外圈的框框顏色
        //btnstyles => { 按鈕的樣式 }
        //textColor => { 中間字的顏色 }
        return{
            coverBorderColor: coverBorderColor,
            btnstyles: btnstyles,
            textColor: textColor
        }
    }
    style() {
        if(this.props.status == 'connect') {
            return (
                this.coverStyles(
                    "6px solid #fff", 
                    {
                        border: '0px solid #fff',
                        backgroundColor: 'rgba(0,0,0,0)',
                        color: '#FFD700',
                    },
                    '#00f'
                )
            )
        }
        else if(this.props.status == 'booking') {
            return (
                this.coverStyles(
                    "6px solid #B5B5B5", 
                    {
                        border: '1px solid #B5B5B5',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                    },
                    'white'
                )
            )
        }
        else if(this.props.status== 'start') {
            return (
                this.coverStyles(
                    "6px solid #90EE90", 
                    {
                        border: '1px solid #90EE90',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color:'white'
                    },
                    '#90EE90'
                )
            )
        }
        else if(this.props.status == 'someonePlaying') {
            return (
                this.coverStyles(
                    "6px solid #f00",
                    {
                        border: '1px solid white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color:'white'
                    },
                    '#f00'
                )
            )
        }
        else{
            return (
                this.coverStyles(
                    "6px solid #fff",
                    {
                        border: '0px solid white',
                        backgroundColor: 'rgba(0,0,0,0)',
                        color:'white'
                    },
                    '#f00'
                )
            )
        }
    }
    render() {
        console.log(this.props)


        return( 
            <div 
                className={styles['cover']}
                style={{
                    border: this.style().coverBorderColor
                }}>

                <div className={styles["exclamationMark"]}></div>

                <div style={{flex:1,display: 'flex', width: '40%', alignItems: 'center',color:this.style().textColor}}>
                    {
                        this.Text().windowText + (!this.props.totalBooking ?'' :' : ' + this.props.totalBooking)
                    }
                </div>
                {
                    this.props.bonusImg
                    ?<div className={styles["bonusImg"]}></div>
                    :<></>

                }
                

                <div style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center'
                    }}>

                    <div style={{width: '50%', color: 'white'}}>
                        {this.props.gameName}
                    </div>
                    <button 
                        onClick={this.btnOnclick}
                        className={styles[this.Text().btnText == '連線中'?"loadBtn":'originBtn']}
                        style={{
                            ...this.style().btnstyles,
                            width: '50%', 
                            height: '50px',
                        }}>
                    
                        {
                            this.Text().btnText + (!this.props.synPosition? '': ' : ' + this.props.synPosition)
                        }
                    </button>

                </div>
            </div>
        )
    }
}