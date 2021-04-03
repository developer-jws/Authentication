import React from "react";
import Header, { HeaderMenu, HeaderMenuWrapper } from "components/Base";
import { useSelector } from "react-redux";

function HeaderContainer() {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));
  return (
    <Header>
      <HeaderMenuWrapper>
        {!user && (
          <>
            <HeaderMenu to="/auth/login">로그인</HeaderMenu>
            <HeaderMenu to="/auth/register">회원가입</HeaderMenu>
          </>
        )}
        {user && (
          <>
            <HeaderMenu to="/auth/logout">로그아웃</HeaderMenu>
          </>
        )}
      </HeaderMenuWrapper>
    </Header>
  );
}

export default HeaderContainer;
