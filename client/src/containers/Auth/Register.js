import { registerRequest } from "api/authAPI";
import {
  AuthButton,
  AuthContent,
  AuthError,
  AuthWrapper,
  CenterAlignedLink,
  InputWithLabel,
} from "components/Auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInput,
  checkEmailExists,
  checkPassword,
  initializeForm,
} from "redux/modules/form";

function Register({ history }) {
  const { email, password, confirmPassword, exists } = useSelector((state) => ({
    email: state.form.register.form.email,
    password: state.form.register.form.password,
    confirmPassword: state.form.register.form.confirmPassword,
    exists: state.form.register.exists,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeForm("register"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emailOnBlur = () => {
    dispatch(checkEmailExists(email));
  };

  const passwordOnBlur = () => {
    dispatch(checkPassword({ password, confirmPassword }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ form: "register", name, value }));
  };

  const onSubmit = async (e) => {
    try {
      if (!exists.email || !exists.password) {
        alert("정보를 확인해 주세요.");
        return;
      }
      const data = await registerRequest({ email, password, confirmPassword });
      console.log(data);
      if (data.registerSuccess) {
        alert("가입이 완료되었습니다.");
        history.push("/auth/login");
      } else {
        alert("오류가 발생했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <AuthWrapper>
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
          onBlur={emailOnBlur}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
          onBlur={passwordOnBlur}
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          onBlur={passwordOnBlur}
        />
        <AuthButton onClick={onSubmit}>회원가입</AuthButton>
        <AuthError>
          {exists.emailMessage || exists.passwordMessage || ""}
        </AuthError>
        <CenterAlignedLink to="/auth/login">로그인</CenterAlignedLink>
      </AuthContent>
    </AuthWrapper>
  );
}

export default Register;
