import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #868e96;
  &:hover {
    color: #adb5bd;
  }
`;

function RightAlignedLink({ to, children }) {
  return (
    <Wrapper>
      <StyledLink to={to}>{children}</StyledLink>
    </Wrapper>
  );
}

export default RightAlignedLink;
