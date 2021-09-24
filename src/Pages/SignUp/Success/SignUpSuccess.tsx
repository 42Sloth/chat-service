import React from 'react';
import logo from 'Assets/Chatpong_logo_trans.png';
import { style } from './SuccessStyle';
import { useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const SignUpSuccess = () => {
  const location = useLocation();
  const info = JSON.stringify(location.state);
  const email = info;

  return (
    <Container>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <SuccessTitle>환영합니다!</SuccessTitle>
      <SuccessDesc>
        회원가입을 축하합니다.
        <br /> 가입하신 아이디는 <span>{email}</span>입니다.
      </SuccessDesc>
      <LoginBtn to="/signin">시작하기</LoginBtn>
    </Container>
  );
};

export default SignUpSuccess;

const { Container, Logo, SuccessTitle, SuccessDesc, LoginBtn } = style;
