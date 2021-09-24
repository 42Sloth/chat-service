import React from 'react';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ISignInForm } from 'Types';
import { styleSignIn } from './SignInStyle';
import { styleSignUp } from 'Pages/SignUp/SignUpStyle';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import logo from 'Assets/Chatpong_logo_trans.png';

const SignIn = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();

  const onSubmit: SubmitHandler<ISignInForm> = async (form) => {
    try {
      const auth = getAuth();
      console.log(form.email, form.password);
      await signInWithEmailAndPassword(auth, form.email, form.password).then(
        (userCredential) => {
          const user = userCredential.user;
          history.push({
            pathname: '/success',
          });
        },
      );
    } catch (e) {
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

        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <Wrap>
            <FormLabel htmlFor="email">아이디</FormLabel>
            <TextInput
              id="email"
              type="email"
              placeholder="name@word-email.com"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>This email field is required</p>}
          </Wrap>

          <Wrap>
            <FormLabel htmlFor="">비밀번호</FormLabel>
            <TextInput
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p>This password field is required</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p>Password must have at least 6 characters</p>
            )}
          </Wrap>

          <Button color="#fff" marginTop="20px" background="#4a154b">
            로그인
          </Button>
        </Form>

        <SignUp>
          처음 사용하시나요?
          <ToSignUp to="/signup">계정 생성</ToSignUp>
        </SignUp>
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

const { Wrap, FormLabel } = styleSignUp;
