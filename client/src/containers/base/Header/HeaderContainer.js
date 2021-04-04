import React from "react";
import Header, {
  HeaderLogo,
  HeaderMenu,
  HeaderMenuWrapper,
  Spacer,
} from "components/Base";
import { useSelector } from "react-redux";

function HeaderContainer() {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));
  return (
    <Header>
      <HeaderLogo to="/">로고</HeaderLogo>
      <HeaderMenu to="/menu/public">Public</HeaderMenu>
      <HeaderMenu to="/menu/private">Private</HeaderMenu>
      <Spacer />
      <HeaderMenuWrapper>
        {!user && (
          <>
            <HeaderMenu to="/login">로그인</HeaderMenu>
            <HeaderMenu to="/register">회원가입</HeaderMenu>
          </>
        )}
        {user && (
          <>
            <HeaderMenu to="/logout">로그아웃</HeaderMenu>
          </>
        )}
      </HeaderMenuWrapper>
    </Header>
  );
}

export default HeaderContainer;
