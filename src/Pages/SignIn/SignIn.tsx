import React from 'react';

import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { query, collection, where, getDocs } from '@firebase/firestore';
import { db } from 'fBase';
import { useSetRecoilState } from 'recoil';
import { ISignInForm } from 'Types';
import { atomMyInfo } from 'Recoil/atom';
import { FormButton } from 'Components';
import { style } from 'Styles/FormStyle';
import logo from 'Assets/Chatpong_logo_trans.png';

const SignIn = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();
  const setMyInfo = useSetRecoilState(atomMyInfo);

  const onSubmit: SubmitHandler<ISignInForm> = async (form) => {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      if (auth.currentUser) {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', auth.currentUser.uid),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          setMyInfo({
            nickname: docData.nickname,
            email: docData.email,
            uid: docData.uid,
            photoURL: docData.photoURL,
          });
        });
      }

      history.push({
        pathname: '/',
      });
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
          <FormButton
            color="#4285f4"
            marginTop="0px"
            background="white"
            type="button"
          >
            Sign in via Google
          </FormButton>
          <FormButton
            color="black"
            marginTop="15px"
            background="white"
            type="button"
          >
            Sign in via 42Seoul
          </FormButton>

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

          <FormButton
            color="#fff"
            marginTop="20px"
            background="#4a154b"
            type="submit"
          >
            로그인
          </FormButton>
        </Form>

        <SignUpText>
          처음 사용하시나요?
          <ToSignUp to="/signup">계정 생성</ToSignUp>
        </SignUpText>
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
  Form,
  Wrap,
  FormLabel,
  Horizontal,
  Hr,
  Input,
  SignUpText,
  Strong,
  Or,
  ToSignUp,
  TextInput,
} = style;
