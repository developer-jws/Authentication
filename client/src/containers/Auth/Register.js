import {
  AuthButton,
  AuthContent,
  AuthWrapper,
  CenterAlignedLink,
  InputWithLabel,
} from "components/Auth";
import React from "react";

function Register() {
  return (
    <AuthWrapper>
      <AuthContent title="회원가입">
        <InputWithLabel label="이메일" name="email" placeholder="이메일" />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          type="password"
        />
        <AuthButton>회원가입</AuthButton>
        <CenterAlignedLink to="/auth/login">로그인</CenterAlignedLink>
      </AuthContent>
    </AuthWrapper>
  );
}

export default Register;
