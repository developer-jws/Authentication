import React from "react";
import Header, { HeaderMenu, HeaderMenuWrapper } from "components/Base";

function HeaderContainer() {
  return (
    <Header>
      <HeaderMenuWrapper>
        <HeaderMenu to="/auth/login">로그인</HeaderMenu>
        <HeaderMenu to="/auth/register">회원가입</HeaderMenu>
      </HeaderMenuWrapper>
    </Header>
  );
}

export default HeaderContainer;
