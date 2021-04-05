import React from "react";
import Header, {
  HeaderLogo,
  HeaderMenu,
  HeaderMenuWrapper,
  Spacer,
} from "components/Base";
import { useSelector } from "react-redux";
import { headerUrl } from "url.js";

function HeaderContainer() {
  const { user } = useSelector((state) => ({
    user: state.auth.user,
  }));
  return (
    <Header>
      <HeaderLogo to={headerUrl.home}>로고</HeaderLogo>
      <HeaderMenu to={headerUrl.public}>Public</HeaderMenu>
      <HeaderMenu to={headerUrl.private}>Private</HeaderMenu>
      <Spacer />
      <HeaderMenuWrapper>
        {!user && (
          <>
            <HeaderMenu to={headerUrl.login}>로그인</HeaderMenu>
            <HeaderMenu to={headerUrl.register}>회원가입</HeaderMenu>
          </>
        )}
        {user && (
          <>
            <HeaderMenu to={headerUrl.logout}>로그아웃</HeaderMenu>
          </>
        )}
      </HeaderMenuWrapper>
    </Header>
  );
}

export default HeaderContainer;
