import React from 'react';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import { DotLoading } from 'antd-mobile';

const TheCountdown = ({ setIsAuto, isAuto }) => {
  const renderer = ({
    formatted: { minutes, seconds }, completed,
  }) => {
    if (completed) {
      return <div>completed</div>;
    }
    if (isAuto.limit === -1) {
      return <span>自動遊戲中</span>;
    }

    return <span>{`自動遊戲中  ${minutes}:${seconds}`}</span>;
  };

  if (isAuto.limit === -1) {
    return (
      <Countdown
        intervalDelay={0}
        precision={3}
        renderer={renderer}
        overtime={isAuto.limit === -1}
      >
        <div>
          <span>自動遊戲中</span>
          <DotLoading color="currentColor" />
        </div>
      </Countdown>
    );
  }

  return (
    <Countdown
      date={Date.now() + isAuto.limit}
      intervalDelay={0}
      renderer={renderer}
      onComplete={() => setIsAuto({ action: false, limit: null })}
    />
  );
};

TheCountdown.propTypes = {
  setIsAuto: PropTypes.func.isRequired,
  isAuto: PropTypes.shape({
    action: PropTypes.bool.isRequired,
    limit: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(TheCountdown);
