import React from "react";

import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  z-index: 1;
  background-color: white;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

const BlankBlock = styled.div`
  width: 100%;
  height: 55px;
  z-index: 1;
  background-color: white;
`;

function Header({ children }) {
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>{children}</HeaderContent>
      </HeaderWrapper>
      <BlankBlock />
    </>
  );
}

export default Header;
