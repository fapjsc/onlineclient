import styled from 'styled-components';

const Wrapper = styled.article`
  max-width: 550px;
  /* border-radius: 10px; */
  height: 7%;
  position: relative;
  box-shadow: 0 0 10px;
  overflow: hidden;
  margin: auto;

  @media only screen and(max-width: 557px) {
    border-radius: 0;
    width: 100vw;
  }
`;

export default Wrapper;
