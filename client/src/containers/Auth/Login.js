import React, { useEffect } from "react";
import {
  AuthButton,
  AuthContent,
  AuthWrapper,
  CenterAlignedLink,
  InputWithLabel,
} from "components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { changeInput, initializeForm } from "redux/modules/form";
import { login } from "redux/modules/auth";

function Login({ history }) {
  const { email, password } = useSelector((state) => ({
    email: state.form.login.form.email,
    password: state.form.login.form.password,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeForm("login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ form: "login", name, value }));
  };

  const onSubmit = (e) => {
    dispatch(login({ email, password, history }));
  };

  return (
    <AuthWrapper>
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <AuthButton onClick={onSubmit}>로그인</AuthButton>
        <CenterAlignedLink to="/auth/register">회원가입</CenterAlignedLink>
      </AuthContent>
    </AuthWrapper>
  );
}

export default Login;
