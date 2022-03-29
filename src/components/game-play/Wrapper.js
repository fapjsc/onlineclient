import styled from 'styled-components';

const Wrapper = styled.article`
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 550px;
  height: 100%;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 0 10px;
  overflow: hidden;

  @media only screen and(max-width: 557px) {
    border-radius: 0;
    width: 100%;
  }
`;

export default Wrapper;
