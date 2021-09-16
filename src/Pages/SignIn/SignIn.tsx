import React from 'react';

import { style } from './SignInStyle';
import logo from 'Assets/Chatpong_logo_trans.png';
const Login = () => {
  return (
    <>
      <Header>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
      </Header>
      <Body>
        <H1Text>ChatPong에 로그인</H1Text>
        <H2Text>
          <Strong>직장에서 사용하는 이메일 주소</Strong>를 사용하는
          것이좋습니다.
        </H2Text>
        <Form>
          <Button color="#4285f4" marginTop="0px" background="white">
            Sign in via Google
          </Button>
          <Button color="black" marginTop="15px" background="white">
            Sign in via 42Seoul
          </Button>
          <Horizontal>
            <Hr />
            <Or>또는</Or>
            <Hr />
          </Horizontal>

          <IdInput />
          <PwInput />

          <Button color="#fff" marginTop="20px" background="#4a154b">
            로그인
          </Button>
          <SignUp>
            ChatPong을 처음 사용하시나요?
            <br />
            <br />
            {/* 임시로 <a> 태그 사용  */}
            <a
              style={{
                color: '#1264a3',
                cursor: 'pointer',
                marginTop: '10px',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              계정 생성
            </a>
          </SignUp>
        </Form>
      </Body>
    </>
  );
};

export default Login;

const {
  Header,
  Logo,
  Body,
  H1Text,
  H2Text,
  Button,
  Form,
  Horizontal,
  Hr,
  IdInput,
  PwInput,
  SignUp,
  Strong,
  Or,
} = style;
