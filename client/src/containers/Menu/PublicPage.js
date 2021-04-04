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

function PublicPage() {
  return (
    <Wrapper>
      <div>Public</div>
    </Wrapper>
  );
}

export default PublicPage;
