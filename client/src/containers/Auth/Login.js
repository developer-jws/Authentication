import React from "react";
import {
  AuthButton,
  AuthContent,
  AuthWrapper,
  CenterAlignedLink,
  InputWithLabel,
} from "components/Auth";

function Login() {
  return (
    <AuthWrapper>
      <AuthContent title="로그인">
        <InputWithLabel label="이메일" name="email" placeholder="이메일" />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <AuthButton>로그인</AuthButton>
        <CenterAlignedLink to="/auth/register">회원가입</CenterAlignedLink>
      </AuthContent>
    </AuthWrapper>
  );
}

export default Login;
