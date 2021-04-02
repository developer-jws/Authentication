import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  font-weight: 400;
  color: #ff0000;
  font-size: 1.05rem;
`;

function AuthError({ children = "" }) {
  return <Wrapper>{children}</Wrapper>;
}

export default AuthError;
