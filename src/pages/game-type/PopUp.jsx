/* eslint-disable */
import { store } from '../../store/index';
import { setPixiStatus } from '../../store/actions/pixiAction';
import styles from './PopUp.module.scss';
import { useEffect } from 'react';

const PopUp = ({showPopUp}) => {
  console.log(showPopUp);
  useEffect(() => {
    store.dispatch(setPixiStatus(false))
  }, [])
  return (
    <div
      onClick={() => store.dispatch(setPixiStatus(false))}
      style={{ display: (showPopUp === true ? 'flex' : 'none') }}
      className={styles.PopUpMask}
    >
        <div className={styles.head}>
            <div>
                <div>北斗之拳-拳王</div>
                <div>
                    <div className={styles.exclamation}>驚嘆號圖片</div>
                    <div className={styles.crossX}/>
                </div>
            </div>
            <div>
                <div>圖片</div>
                <button>預約</button>
                <button>開始遊戲</button>
            </div>
            <div>

            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.bodyTitle}></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>

        </div>
    </div>
  );
};
export default PopUp;
