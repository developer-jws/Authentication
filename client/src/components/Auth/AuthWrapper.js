import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const AuthBox = styled.div`
  width: 500px;
`;

const Contents = styled.div`
  padding: 2rem;
  height: auto;
`;

function AuthWrapper({ children }) {
  return (
    <Wrapper>
      <AuthBox>
        <Contents>{children}</Contents>
      </AuthBox>
    </Wrapper>
  );
}

export default AuthWrapper;
