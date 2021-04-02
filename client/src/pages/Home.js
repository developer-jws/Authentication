import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 70px;
  font-weight: 400;
`;

function Home() {
  return <Wrapper> Home </Wrapper>;
}

export default Home;
