import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HeaderMenu } from ".";

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

const HeaderLogo = styled(Link)`
  display: flex;
  justify-content: center;
  min-width: 60px;
  font-size: 1.5rem;
  margin: 0 1rem 0 1rem;
  text-decoration: none;
  letter-spacing: 2px;
  color: #343a40;
`;

const Spacer = styled.div`
  flex-grow: 1;
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
        <HeaderContent>
          <HeaderLogo to="/">로고</HeaderLogo>
          <HeaderMenu to="/">메뉴1</HeaderMenu>
          <HeaderMenu to="/">메뉴2</HeaderMenu>
          <HeaderMenu to="/">메뉴1</HeaderMenu>
          <Spacer />
          {children}
        </HeaderContent>
      </HeaderWrapper>
      <BlankBlock />
    </>
  );
}

export default Header;
