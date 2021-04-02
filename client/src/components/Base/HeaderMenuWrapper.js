import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
`;
function HeaderMenuWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default HeaderMenuWrapper;
