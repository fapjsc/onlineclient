import React from 'react';
import PropTypes from 'prop-types';

// Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Popup, Button } from 'antd-mobile';
import { AppOutline } from 'antd-mobile-icons';

// Actions
import {
  clearSelectEgmData,
  clearButtonPressStatus,
  clearCashInOutStatus,
} from '../../store/actions/egmActions';

const Menu = ({ visible, setVisible }) => {
  const dispatch = useDispatch();

  const exitGameHandler = () => {
    dispatch(clearButtonPressStatus());
    dispatch(clearCashInOutStatus());
    dispatch(clearSelectEgmData());
  };

  return (
    <>
      <AppOutline
        onClick={() => {
          setVisible(true);
        }}
        style={{
          color: '#fff',

          fontSize: '2rem',
          cursor: 'pointer',
        }}
      />
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        position="right"
        bodyStyle={{ minWidth: '40vw' }}
      >
        <div style={{ padding: '1rem' }}>
          <Button color="danger" size="large" onClick={exitGameHandler}>
            <Link to="/">離開</Link>
          </Button>
        </div>
      </Popup>
    </>
  );
};

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Menu;
