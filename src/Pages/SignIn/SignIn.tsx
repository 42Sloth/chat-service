import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { ISignInForm } from 'Types';
import { styleSignIn } from './SignInStyle';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';

const SignIn = () => {
  const history = useHistory();
  const [form, setForm] = useState<ISignInForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setForm((prevForm: ISignInForm) => ({
      ...prevForm,
      [e.target.name]: text,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, form.email, form.password).then(
        (userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;
          history.push({
            pathname: '/success',
            state: JSON.stringify(user),
          });
        },
      );
    } catch (e) {
      console.log('에러임');
      console.log(e);
    }
  };

  return (
    <>
      <Header>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
      </Header>
      <Body>
        <H1Text>SignIn</H1Text>
        <H2Text>
          <Strong>직장에서 사용하는 이메일 주소</Strong>를 사용하는
          것이좋습니다.
        </H2Text>
        <Form onSubmit={handleSubmit}>
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

          <TextInput />
          <TextInput />

          <Button color="#fff" marginTop="20px" background="#4a154b">
            로그인
          </Button>
          <SignUp>
            처음 사용하시나요?
            <ToSignUp to="/signup">계정 생성</ToSignUp>
          </SignUp>
        </Form>
      </Body>
    </>
  );
};

export default SignIn;

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
  SignUp,
  Strong,
  Or,
  ToSignUp,
  TextInput,
} = styleSignIn;
