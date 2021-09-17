import React from 'react';

import { styleSignIn } from 'Pages/SignIn/SignInStyle';
import { styleSignUp } from './SignUpStyle';
import logo from 'Assets/Chatpong_logo_trans.png';

const SignUp: React.FC = () => {
  return (
    <>
      <Header>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
      </Header>

      <Body>
        <H1Text>SignUp</H1Text>
        <H2Text>
          <Strong>직장에서 사용하는 이메일 주소</Strong>로 가입하는 것이
          좋습니다.
        </H2Text>

        <Form>
          <Wrap>
            <IdInput />
            <IdCheckBtn color="#611f69" marginTop="0px" background="white">
              중복 확인
            </IdCheckBtn>
          </Wrap>

          <PwInput />
          <PwCheckInput />

          <Wrap>
            <NickNameInput />
            <NickNameCheckBtn
              color="#1264a3"
              marginTop="0px"
              background="white"
            >
              중복 확인
            </NickNameCheckBtn>
          </Wrap>

          <Button color="#fff" marginTop="25px" background="#611f69">
            회원 가입
          </Button>
        </Form>
      </Body>
    </>
  );
};

export default SignUp;

const {
  Header,
  Logo,
  Body,
  H1Text,
  H2Text,
  Button,
  Form,
  IdInput,
  PwInput,
  Strong,
} = styleSignIn;

const { Wrap, IdCheckBtn, PwCheckInput, NickNameInput, NickNameCheckBtn } =
  styleSignUp;
