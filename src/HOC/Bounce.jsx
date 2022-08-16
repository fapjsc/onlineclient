import React from 'react';

const Bounce = (Wrapper = null) => {
  class Hoc extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.clickInScale = this.clickInScale.bind(this);
      this.clickOutScale = this.clickOutScale.bind(this);
    }

    clickInScale(event) {
      event.target.style.transform = 'scale(0.6)';
    }

    clickOutScale(event) {
      event.target.style.transform = null;
    }

    render() {
      if (Wrapper) {
        return (
          <Wrapper
            onPointerLeave={(event) => this.clickOutScale(event)}
            onPointerDown={(event) => this.clickInScale(event)}
            onPointerOut={(event) => this.clickOutScale(event)}
            {...this.props}
          >
            {/* //pass */}
          </Wrapper>
        );
      }
      return (
        <div
          onPointerOut={(event) => this.clickOutScale(event)}
          onPointerLeave={(event) => this.clickOutScale(event)}
          onPointerDown={(event) => this.clickInScale(event)}
          onPointerUp={(event) => this.clickOutScale(event)}
          {...this.props}
        >
          {/* //pass */}
        </div>
      );
    }
  }
  return Hoc;
};
export default Bounce;
