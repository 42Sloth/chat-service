import React, { useState } from 'react';
import { styleSignIn } from 'Pages/SignIn/SignInStyle';
import { styleSignUp } from './SignUpStyle';
import { ISignUpForm } from 'Types';
import logo from 'Assets/Chatpong_logo_trans.png';
import { app, db } from '../../fBase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const SignUp: React.FC = () => {
  const [form, setForm] = useState<ISignUpForm>({
    nickname: '',
    email: '',
    password: '',
    validatedPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: text }));
  };

  // const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      ).then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      });

      const docRef = await addDoc(collection(db, 'users'), {
        nickname: form.nickname,
        email: form.email,
      });
    } catch (error) {
      console.log(error);
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
        <H1Text>SignUp</H1Text>
        <H2Text>
          <Strong>직장에서 사용하는 이메일 주소</Strong>로 가입하는 것이
          좋습니다.
        </H2Text>

        <Form onSubmit={handleSubmit}>
          <Wrap>
            <IdInput onChange={handleChange} />
            <IdCheckBtn color="#611f69" marginTop="0px" background="white">
              중복 확인
            </IdCheckBtn>
          </Wrap>

          <Wrap>
            <NickNameInput onChange={handleChange} />
            <NickNameCheckBtn
              color="#1264a3"
              marginTop="0px"
              background="white"
            >
              중복 확인
            </NickNameCheckBtn>
          </Wrap>

          <PwInput onChange={handleChange} />
          <PwCheckInput onChange={handleChange} />

          <Button
            color="#fff"
            marginTop="25px"
            background="#611f69"
            type="submit"
          >
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
